import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { Observable, combineLatest, of, BehaviorSubject, Subscription } from 'rxjs';
import { MovieService, Movie } from '@blockframes/movie/+state';
import { FormControl } from '@angular/forms';
import { MovieSearchForm, createMovieSearch } from '@blockframes/movie/form/search.form';
import { map, debounceTime, switchMap, pluck, startWith, distinctUntilChanged, tap } from 'rxjs/operators';
// import { sortMovieBy } from '@blockframes/utils/akita-helper/sort-movie-by'; // TODO issue #3584
import { DynamicTitleService } from '@blockframes/utils/dynamic-title/dynamic-title.service';
import { CdkScrollable } from '@angular/cdk/overlay';

@Component({
  selector: 'festival-marketplace-title-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, OnDestroy {

  private movieSearchResultsState = new BehaviorSubject<Movie[]>([]);
  public movieSearchResults$: Observable<Movie[]>;
  private sub: Subscription;
  public nbHits: number;
  public hitsViewed = 0;

  public sortByControl: FormControl = new FormControl('Title');
  public sortOptions: string[] = ['Title', 'Director' /* 'Production Year' #1146 */];

  public filterForm = new MovieSearchForm();

  private scrollOffsetTop: number;

  constructor(
    private movieService: MovieService,
    private cdr: ChangeDetectorRef,
    private dynTitle: DynamicTitleService,
    private scrollable: CdkScrollable
  ) { }

  ngOnInit() {
    this.dynTitle.setPageTitle('Films On Our Market Today');
    // Implicitly we only want accepted movies
    this.filterForm.storeConfig.add('accepted');
    // On festival, we want only movie available for festival
    this.filterForm.appAccess.add('festival');

    this.movieSearchResults$ = this.movieSearchResultsState.asObservable();

    this.sub = combineLatest([
      this.sortByControl.valueChanges.pipe(startWith('Title')),
      this.filterForm.valueChanges.pipe(startWith(this.filterForm.value), distinctUntilChanged())
    ]).pipe(
      debounceTime(300),
      switchMap(() => this.filterForm.search()),
      tap(res => this.nbHits = res.nbHits),
      pluck('hits'),
      tap(movies => this.hitsViewed = this.hitsViewed + movies.length),
      map(result => result.map(movie => movie.objectID)),
      switchMap(ids => ids.length ? this.movieService.valueChanges(ids) : of([])),
      // map(movies => movies.sort((a, b) => sortMovieBy(a, b, this.sortByControl.value))), // TODO issue #3584
      tap(movies => this.movieSearchResultsState.next(this.movieSearchResultsState.value.concat(movies))),
      tap(_ => setTimeout(() => this.scrollToScrollOffset(), 0))
    ).subscribe();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  clear() {
    const initial = createMovieSearch({ appAccess: ['festival'], storeConfig: ['accepted'] });
    this.filterForm.reset(initial);
    this.cdr.markForCheck();
  }

  async loadMore() {
    this.setScrollOffset();
    this.filterForm.page.setValue(this.filterForm.page.value + 1);
    await this.filterForm.search();
  }

  setScrollOffset() {
    this.scrollOffsetTop = this.scrollable.measureScrollOffset('top');
  }

  scrollToScrollOffset() {
    this.scrollable.scrollTo({ top: this.scrollOffsetTop });
  }
  
}
