// Angular
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
  MatAutocompleteTrigger
} from '@angular/material/autocomplete';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ElementRef,
  ViewChild,
  HostBinding,
  Inject
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
// Blockframes
import { Movie } from '@blockframes/movie/movie/+state/movie.model';
import { MovieQuery } from '@blockframes/movie/movie/+state/movie.query';
import { FireAnalytics } from '@blockframes/utils/analytics/app-analytics';
import { AnalyticsEvents } from '@blockframes/utils/analytics/analyticsEvents';
import {
  GenresLabel,
  GENRES_LABEL,
  LANGUAGES_LABEL,
  LanguagesLabel,
  CertificationsLabel,
  MediasLabel,
  CERTIFICATIONS_LABEL,
  MEDIAS_LABEL,
  TERRITORIES_LABEL,
  GenresSlug,
  CertificationsSlug,
  LanguagesSlug,
  MediasSlug,
  TerritoriesSlug,
  MovieStatusLabel,
  MOVIE_STATUS_LABEL,
  MovieStatusSlug
} from '@blockframes/utils/static-model/types';
import { getCodeIfExists, ExtractCode } from '@blockframes/utils/static-model/staticModels';
import { languageValidator } from '@blockframes/utils/form/validators/validators';
import { ControlErrorStateMatcher } from '@blockframes/utils/form/validators/validators';
import { MovieAlgoliaResult } from '@blockframes/utils/algolia';
import { MoviesIndex } from '@blockframes/utils/algolia';
// RxJs
import { Observable, combineLatest } from 'rxjs';
import { startWith, map, debounceTime, switchMap, tap, distinctUntilChanged } from 'rxjs/operators';
// Others
import { CatalogSearchForm } from './search.form';
import { filterMovie } from './filter.util';
import { AFM_DISABLE } from '@env';
import { CartService } from '@blockframes/organization/cart/+state/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Index } from 'algoliasearch';
import flatten from 'lodash/flatten';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { CatalogCartQuery } from '@blockframes/organization/cart/+state/cart.query';
import { MovieDocumentWithDates } from '@blockframes/movie/movie/+state/movie.firestore';
import { DistributionDealService } from '@blockframes/movie/distribution-deals/+state/distribution-deal.service';
import { NumberRange } from '@blockframes/utils/common-interfaces/range';
import { BUDGET_LIST } from '@blockframes/movie/movieform/budget/budget.form';

@Component({
  selector: 'catalog-movie-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketplaceSearchComponent implements OnInit {
  @HostBinding('attr.page-id') pageId = 'catalog-search';

  /** Algolia search results */
  private algoliaSearchResults$: Observable<MovieAlgoliaResult[]>;

  /* Observable of all movies */
  public movieSearchResults$: Observable<MovieDocumentWithDates[]>;

  /* Instance of the search form */
  public filterForm = new CatalogSearchForm();

  /* Variables for searchbar autocompletion */
  public allDirectors: string[] = [];
  public allTitles: string[];
  public allKeywords: string[];

  /* Observables on the languages selected */
  public languages$ = this.filterForm.valueChanges.pipe(
    startWith(this.filterForm.value),
    map(({ languages }) => Object.keys(languages))
  );

  /* Array of sorting options */
  public sortOptions: string[] = ['All films', 'Title', 'Director' /* 'Production Year' #1146 */];

  /* Flag to indicate either the movies should be presented as a card or a list */
  public listView: boolean;

  /* Array of searchbar options */
  public searchbarOptions: string[] = ['director', 'title', 'keywords'];

  /* Data for UI */
  public movieGenres: GenresLabel[] = GENRES_LABEL;
  public movieProductionStatuses: MovieStatusLabel[] = MOVIE_STATUS_LABEL;
  public movieCertifications: CertificationsLabel[] = CERTIFICATIONS_LABEL;
  public movieMedias: MediasLabel[] = MEDIAS_LABEL;

  /* Filter for autocompletion */
  public genresFilter$: Observable<string[]>;
  public territoriesFilter$: Observable<string[]>;
  public countriesFilter$: Observable<string[]>;
  public languagesFilter$: Observable<string[]>;
  public salesAgentFilter$: Observable<string[]>;
  public resultFilter$: Observable<any[]>;

  /* Individual form controls for filtering */
  public genreControl: FormControl = new FormControl('');
  public languageControl: FormControl = new FormControl('', [
    Validators.required
  ]);
  public territoryControl: FormControl = new FormControl('');
  public countryControl: FormControl = new FormControl('');
  public salesAgentControl: FormControl = new FormControl('');
  public sortByControl: FormControl = new FormControl('');
  public searchbarTextControl: FormControl = new FormControl('');

  private filterBy$ = this.filterForm.valueChanges.pipe(startWith(this.filterForm.value));
  private sortBy$ = this.sortByControl.valueChanges.pipe(startWith(this.sortByControl.value));

  /* Arrays for showing the selected entities in the UI */
  public selectedMovieTerritories: string[] = [];

  /* Arrays for showing the selected countries in the UI */
  public selectedMovieCountries: string[] = [];

  /* Flags for Sales Agents chip input*/
  public selectedSalesAgents: string[] = [];
  public salesAgents: string[] = [];

  public budgetList: NumberRange[] = BUDGET_LIST;

  @ViewChild('salesAgentInput', { static: false }) salesAgentInput: ElementRef<HTMLInputElement>;
  @ViewChild('salesAgent', { static: false }) salesAgentMatAutocomplete: MatAutocomplete;

  /* Flags for the Territories chip input */
  public visible = true;
  public selectable = true;
  public removable = true;

  /* Number of available movies in the database */
  public movieCount: number;

  public selectedGenres: string[] = [];
  @ViewChild('genreInput', { static: false }) genreInput: ElementRef<HTMLInputElement>;
  @ViewChild('genre', { static: false }) genreMatAutocomplete: MatAutocomplete;

  public matcher = new ControlErrorStateMatcher();

  public isMobile: boolean = this.breakpointObserver.isMatched('(max-width: 599px)');

  @ViewChild('territoryInput', { static: false }) territoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoCompleteInput', { static: false, read: MatAutocompleteTrigger })
  public autoComplete: MatAutocompleteTrigger;

  @ViewChild('countryInput', { static: false }) countryInput: ElementRef<HTMLInputElement>;

  constructor(
    private router: Router,
    private routerQuery: RouterQuery,
    private distributionDealService: DistributionDealService,
    private cartService: CartService,
    private catalogCartQuery: CatalogCartQuery,
    private snackbar: MatSnackBar,
    private movieQuery: MovieQuery,
    private breakpointObserver: BreakpointObserver,
    @Inject(MoviesIndex) private movieIndex: Index,
    private analytics: FireAnalytics
  ) {}

  ngOnInit() {
    this.algoliaSearchResults$ = this.searchbarForm.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(searchText => {
        return new Promise<MovieAlgoliaResult[]>((res, rej) => {
          this.movieIndex.search(searchText.text, (err, result) =>
            err ? rej(err) : res(result.hits)
          );
        });
      }),
      // tap((movies: MovieAlgoliaResult[]) => {
      //   movies.forEach(index => {
      //     if (!this.salesAgents.includes(index.movie.salesAgentDeal.salesAgent.displayName)) {
      //       this.salesAgents.push(index.movie.salesAgentDeal.salesAgent.displayName);
      //     }
      //   });
      //   this.allTitles = movies.map(index => index.movie.main.title.international);
      //   this.allKeywords = flatten(
      //     movies.map(index => index.movie.promotionalDescription.keywords)
      //   );
      //   this.allDirectors = flatten(
      //     movies.map(index =>
      //       index.movie.main.directors.map(name => `${name.firstName} ${name.lastName}`)
      //     )
      //   );
      // })
    );

    this.movieSearchResults$ = combineLatest([
      this.algoliaSearchResults$,
      this.filterBy$,
      this.sortBy$
    ]).pipe(
      map(([algoliaMovies, filterOptions, sortBy]) => {
        const movieIds = algoliaMovies.map(index => index.objectID);
        const filteredIds = movieIds.filter(movieId => {
          const movie = this.movieQuery.getEntity(movieId);
          return filterMovie(movie, filterOptions)
        });
        const movies = this.movieQuery.getAll({ filterBy: movie => filteredIds.includes(movie.id) });
        this.movieCount = movies.length;
        return movies
      })
    );

    this.genresFilter$ = this.genreControl.valueChanges.pipe(
      startWith(''),
      map(genre => (genre ? this._genreFilter(genre) : this.movieGenres))
    );

    this.languagesFilter$ = this.languageControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      map(value => this._languageFilter(value))
    );

    this.territoriesFilter$ = this.territoryControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      map(territory => this._territoriesFilter(territory))
    );

    this.countriesFilter$ = this.countryControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      map(country => this._countriesFilter(country))
    );

    this.salesAgentFilter$ = this.salesAgentControl.valueChanges.pipe(
      startWith(''),
      map(salesAgent => (salesAgent ? this._salesAgentsFilter(salesAgent) : this.salesAgents))
    );
    this.resultFilter$ = this.searchbarTextControl.valueChanges.pipe(
      startWith(''),
      tap(value => this.searchbarForm.get('text').setValue(value)),
      map(value => this._resultFilter(value))
    );
  }

  public goToMovieDetails(id: string) {
    this.router.navigateByUrl(`c/o/marketplace/${id}`);
  }

  public get getCurrentYear(): number {
    return new Date().getFullYear();
  }

  public get searchbarForm(): FormGroup {
    return this.filterForm.get('searchbar');
  }

  public get searchbarTypeForm() {
    return this.filterForm.get('searchbar').get('type');
  }

  public get appName() {
    return this.routerQuery.getValue().state.root.data.app;
  }

  public toggleAutoCompletion() {
    this.autoComplete.closePanel();
  }

  /**
   * @description function for determine if FormGroup error should be shown.
   * We want to show this error only, if the children controls don't have any error.
   * @param formGroupName name of the form group which determine the logic.
   */
  public showFormGroupError(formGroupName: string): boolean {
    if (formGroupName === 'productionYear') {
      return (
        !this.filterForm
          .get('productionYear')
          .get('from')
          .hasError('pattern') &&
        !this.filterForm
          .get('productionYear')
          .get('from')
          .hasError('max') &&
        (!this.filterForm
          .get('productionYear')
          .get('to')
          .hasError('pattern') &&
          this.filterForm.get('productionYear').hasError('invalidRange'))
      );
    } else {
      return (
        !this.filterForm
          .get('availabilities')
          .get('from')
          .hasError('min') && this.filterForm.get('availabilities').hasError('invalidRange')
      );
    }
  }

  ////////////////////
  // Filter section //
  ////////////////////

  /**
   * @description returns an array of strings for the autocompletion component
   * @param value string which got typed in into an input field
   */
  private _genreFilter(genre: string): string[] {
    const filterValue = genre.toLowerCase();
    return GENRES_LABEL.filter(movieGenre => {
      return movieGenre.toLowerCase().includes(filterValue);
    });
  }

  /**
   * @description returns an array of strings for the autocompletion component
   * @param value string which got typed in into an input field
   */
  private _territoriesFilter(territory: string): string[] {
    const filterValue = territory.toLowerCase();
    return TERRITORIES_LABEL.filter(movieTerritory => {
      return movieTerritory.toLowerCase().includes(filterValue);
    });
  }

  /**
 * @description returns an array of strings for the autocompletion component
 * @param value string which got typed in into an input field
 */
  private _countriesFilter(country: string): string[] {
    const filterValue = country.toLowerCase();
    return TERRITORIES_LABEL.filter(movieCountry => {
      return movieCountry.toLowerCase().includes(filterValue);
    });
  }

  /**
   * @description returns an array of strings for the autocompletion component
   * @param value string which got typed in into an input field
   */
  private _languageFilter(value: string): string[] {
    if (value) {
      return LANGUAGES_LABEL.filter(language => language.toLowerCase().includes(value.toLowerCase()));
    }
  }

  /**
   * @description returns an array of strings for the autocompletion component
   * @param value string which got typed in into an input field
   */
  private _salesAgentsFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.salesAgents.filter(salesAgent => salesAgent.toLowerCase().includes(filterValue));
  }

  /**
   * @description returns an array of strings for the autocompletion component.
   * Also we need to distinguish on what type the user want to have his results
   * @param value string which got typed in into an input field
   */
  private _resultFilter(value: string): string[] {
    if (this.searchbarTypeForm.value === 'title') {
      return this.allTitles.filter(title => title.toLowerCase().includes(value.toLowerCase()));
    } else if (this.searchbarTypeForm.value === 'keywords') {
      return this.allKeywords.filter(word => word.toLowerCase().includes(value.toLowerCase()));
    } else if (this.searchbarTypeForm.value === 'director') {
      return this.allDirectors.filter(director => {
        return director.toLowerCase().includes(value.toLowerCase());
      });
    }
  }

  //////////////////
  // Form section //
  //////////////////

  public addLanguage(language: LanguagesLabel) {
    /**
     * We want to exchange the label for the slug,
     * because for our backend we need to store the slug.
     */
    const languageSlug: LanguagesSlug = getCodeIfExists('LANGUAGES', language);
    if (LANGUAGES_LABEL.includes(language)) {
      this.filterForm.addLanguage(languageSlug);
      this.analytics.event(AnalyticsEvents.addedLanguage, { language });
    } else {
      throw new Error('Something went wrong. Please choose a language from the drop down menu.');
    }
  }

  public removeLanguage(language: LanguagesLabel) {
    /**
     * We want to exchange the label for the slug,
     * because for our backend we need to store the slug.
     */
    const languageSlug: LanguagesSlug = getCodeIfExists('LANGUAGES', language);
    this.filterForm.removeLanguage(languageSlug);
    this.analytics.event(AnalyticsEvents.removedLanguage, { language });
  }

  public hasBudget(budget: NumberRange) {
    const value = this.filterForm.get('estimatedBudget').value;
    if (!value.includes(budget)) {
      this.filterForm.get('estimatedBudget').setValue([...value, budget]);
    } else {
      const valueWithoutBudget = value.filter(v =>  v !== budget);
      this.filterForm.get('estimatedBudget').setValue(valueWithoutBudget);
    }
  }

  public hasStatus(status: MovieStatusLabel) {
    /**
     * We want to exchange the label for the slug,
     * because for our backend we need to store the slug.
     */
    const productionStatusSlug = getCodeIfExists('MOVIE_STATUS', status);
    if (
      this.movieProductionStatuses.includes(status) &&
      !this.filterForm.get('status').value.includes(productionStatusSlug)
    ) {
      this.filterForm.addStatus(productionStatusSlug);
      this.analytics.event(AnalyticsEvents.addedMovieStatus, { status });
    } else {
      this.filterForm.removeStatus(productionStatusSlug);
      this.analytics.event(AnalyticsEvents.removedMovieStatus, { status });
    }
  }

  public checkCertification(certification: CertificationsLabel) {
    /**
     * We want to exchange the label for the slug,
     * because for our backend we need to store the slug.
     */
    const certificationSlug: CertificationsSlug = getCodeIfExists('CERTIFICATIONS', certification);
    if (this.movieCertifications.includes(certification)) {
      this.filterForm.checkCertification(certificationSlug);
    }
  }

  public checkMedia(media: MediasLabel) {
    /**
     * We want to exchange the label for the slug,
     * because for our backend we need to store the slug.
     */
    const mediaSlug: MediasSlug = getCodeIfExists('MEDIAS', media);
    if (this.movieMedias.includes(media)) {
      this.filterForm.checkMedia(mediaSlug);
    }
  }

  public removeCountry(country: string, index: number) {
    const i = this.selectedMovieCountries.indexOf(country);

    if (i >= 0) {
      this.selectedMovieCountries.splice(i, 1);
    }
    this.filterForm.removeCountry(index);
  }

  public selectedCountry(country: MatAutocompleteSelectedEvent) {
    if (!this.selectedMovieCountries.includes(country.option.viewValue)) {
      this.selectedMovieCountries.push(country.option.value);
    }
    /**
     * We want to exchange the label for the slug,
     * because for our backend we need to store the slug.
     */
    const territorySlug: TerritoriesSlug = getCodeIfExists(
      'TERRITORIES',
      country.option.viewValue as ExtractCode<'TERRITORIES'>
    );
    this.filterForm.addCountry(territorySlug);
    this.countryInput.nativeElement.value = '';
  }

  public removeTerritory(territory: string, index: number) {
    const i = this.selectedMovieTerritories.indexOf(territory);

    if (i >= 0) {
      this.selectedMovieTerritories.splice(i, 1);
    }
    this.filterForm.removeTerritory(index);
  }

  public selectedTerritory(territory: MatAutocompleteSelectedEvent) {
    if (!this.selectedMovieTerritories.includes(territory.option.viewValue)) {
      this.selectedMovieTerritories.push(territory.option.value);
    }
    /**
     * We want to exchange the label for the slug,
     * because for our backend we need to store the slug.
     */
    const territorySlug: TerritoriesSlug = getCodeIfExists(
      'TERRITORIES',
      territory.option.viewValue as ExtractCode<'TERRITORIES'>
    );
    this.filterForm.addTerritory(territorySlug);
    this.territoryInput.nativeElement.value = '';
  }

  public addGenre(event: MatAutocompleteSelectedEvent) {
    const genre = event.option.value;

    if ((genre || '').trim() && !this.selectedGenres.includes(genre)) {
      this.selectedGenres.push(genre.trim());
    }
    /**
     * We want to exchange the label for the slug,
     * because for our backend we need to store the slug.
     */
    const genreSlug: GenresSlug = getCodeIfExists('GENRES', genre);
    this.filterForm.addGenre(genreSlug);
    this.genreControl.setValue('');
    this.genreInput.nativeElement.value = '';
    this.analytics.event(AnalyticsEvents.addedGenre, { genre });
  }

  public removeGenre(genre: ExtractCode<'GENRES'>) {
    const index = this.selectedGenres.indexOf(genre);
    if (index >= 0) {
      this.selectedGenres.splice(index, 1);
      const genreSlug: GenresSlug = getCodeIfExists('GENRES', genre);
      this.filterForm.removeGenre(genreSlug);
      this.analytics.event(AnalyticsEvents.removedGenre, { genre });
    }
  }

  public toggle$(movieId: string) {
    return this.catalogCartQuery.isAddedToWishlist(movieId);
  }

  public addToWishlist(movie: Movie) {
    this.cartService.updateWishlist(movie);
    this.snackbar.open(
      `${movie.main.title.international} has been added to your selection.`,
      'close',
      { duration: 2000 }
    );
    this.analytics.event(AnalyticsEvents.addedToWishlist, {
      movieId: movie.id,
      movieTitle: movie.main.title.original
    });
  }

  public removeFromWishlist(movie: Movie) {
    this.cartService.updateWishlist(movie);
    this.snackbar.open(
      `${movie.main.title.international} has been removed from your selection.`,
      'close',
      { duration: 2000 }
    );
    this.analytics.event(AnalyticsEvents.removedFromWishlist, {
      movieId: movie.id,
      movieTitle: movie.main.title.original
    });
  }

  public addSearchbarValue(value: MatAutocompleteSelectedEvent) {
    this.searchbarForm.get('text').setValue(value.option.viewValue);
  }

  public selectSearchType(type: string) {
    if (this.searchbarForm.value !== type) {
      this.searchbarTypeForm.setValue(type);
      this.analytics.event(AnalyticsEvents.searchbarSearchType, { type });
    } else {
      this.searchbarTypeForm.setValue('');
    }
  }
}
