import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Movie, MovieQuery } from '@blockframes/movie/+state';
import { CartService } from '@blockframes/cart/+state/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FireAnalytics } from '@blockframes/utils/analytics/app-analytics';
import { CatalogCartQuery } from '@blockframes/cart/+state/cart.query';
import { getLabelBySlug } from '@blockframes/utils/static-model/staticModels';
import { DynamicTitleService } from '@blockframes/utils/dynamic-title/dynamic-title.service';

interface CarouselSection {
  title: string;
  subline: string;
  movies: Partial<Movie>[];
}
@Component({
  selector: 'catalog-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketplaceHomeComponent implements OnInit {

  /** Observable to fetch all movies from the store */
  public moviesBySections$: Observable<CarouselSection[]>;

  constructor(
    private movieQuery: MovieQuery,
    private cartService: CartService,
    private snackbar: MatSnackBar,
    private analytics: FireAnalytics,
    private catalogCartQuery: CatalogCartQuery,
    private dynTitle: DynamicTitleService
  ) {
    this.dynTitle.setPageTitle('Marketplace')
  }

  ngOnInit() {
    const latest$ = this.movieQuery.selectAll({
      filterBy: movies => movies.main.productionYear >= 2018 && movies.main.storeConfig.appAccess.catalog
    });
    const postProduction$ = this.movieQuery.selectAll({
      filterBy: movies => movies.main.status === 'post-production' && movies.main.storeConfig.appAccess.catalog
    });
    const completed$ = this.movieQuery.selectAll({
      filterBy: movies => movies.main.status === 'finished' && movies.main.storeConfig.appAccess.catalog
    });

    this.moviesBySections$ = combineLatest([latest$, postProduction$, completed$]).pipe(
      map(([latest, postProduction, completed]) => {
        return [
          {
            title: 'New Films',
            subline: 'Discover our latest releases',
            movies: latest
          },
          {
            title: 'Post-Production Films',
            subline: 'Brand new projects with great potential',
            movies: postProduction
          },
          {
            title: 'Completed Films',
            subline: 'Explore our selection of fresh or library titles',
            movies: completed
          }
        ];
      })
    );
  }

  public layout(index: number) {
    return index % 2 === 0 ? 'row' : 'row-reverse';
  }

  public alignment(index: number) {
    return index % 2 === 0 ? 'start start' : 'start end';
  }

  public toggle$(movieId: string) {
    return this.catalogCartQuery.isAddedToWishlist(movieId);
  }

  public addToWishlist(movie: Movie, event: Event) {
    event.stopPropagation();
    this.cartService.updateWishlist(movie);
    this.snackbar.open(`Title ${movie.main.title.international} has been added.`, 'close', { duration: 2000 });
    this.analytics.event('addedToWishlist', {
      movieId: movie.id,
      movieTitle: movie.main.title.original,
    });
  }

  public removeFromWishlist(movie: Movie, event: Event) {
    event.stopPropagation();
    this.cartService.updateWishlist(movie);
    this.snackbar.open(`Title ${movie.main.title.international} has been removed.`, 'close', { duration: 2000 });
    this.analytics.event('removedFromWishlist', {
      movieId: movie.id,
      movieTitle: movie.main.title.original,
    });
  }

  // TODO 1880 country short code
  public getMainInfo(movie: Movie) {
    const { originCountries, totalRunTime, genres } = movie.main;
    return [
      originCountries.slice(0, 2).map(country => country.toUpperCase()).join(', '),
      typeof totalRunTime === 'number' ? `${totalRunTime} min` : 'TBC',
      genres.slice(0, 2).map(genre => getLabelBySlug('GENRES', genre)).join(', '),
    ].filter(value => !!value).join(' | ');
  }
}
