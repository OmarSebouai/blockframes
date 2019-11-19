import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChangeDetectionStrategy, Component, HostBinding, OnInit, Inject } from '@angular/core';
import { Movie, MovieQuery } from '@blockframes/movie/movie/+state';
import { BasketService } from '../../distribution-right/+state/basket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImgRef } from '@blockframes/utils/image-uploader';
import { Analytics, ANALYTICS } from '@blockframes/utils';
import { AuthQuery } from '@blockframes/auth';


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
  @HostBinding('attr.page-id') pageId = 'catalog-marketplace-homepage';

  /** Observable to fetch all movies from the store */
  public moviesBySections$: Observable<CarouselSection[]>;

  constructor(
    private movieQuery: MovieQuery,
    private basketService: BasketService,
    private snackbar: MatSnackBar,
    private authQuery: AuthQuery,
    @Inject(ANALYTICS) private logService: Analytics
  ) {}

  ngOnInit() {
    const latest$ = this.movieQuery.selectAll({
      filterBy: movies => movies.main.productionYear >= 2018
    });
    const preProduction$ = this.movieQuery.selectAll({
      filterBy: movies => movies.main.status === 'financing'
    });
    const completed$ = this.movieQuery.selectAll({
      filterBy: movies => movies.main.status === 'finished'
    });

    this.moviesBySections$ = combineLatest([latest$, preProduction$, completed$]).pipe(
      map(([latest, preProduction, completed]) => {
        return [
          {
            title: 'New Films',
            subline: 'Discover our latest releases',
            movies: latest
          },
          {
            title: 'Pre-production Films',
            subline: 'Brand new projects with great potential',
            movies: preProduction
          },
          {
            title: 'Completed Films',
            subline: 'Explore our selection of acclaimed and unreleased films',
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
    return this.basketService.isAddedToWishlist(movieId);
  }

  public addToWishlist(movie: Movie, event: Event) {
    event.stopPropagation();
    this.basketService.updateWishlist(movie);
    this.snackbar.open(
      `${movie.main.title.international} has been added to your selection.`,
      'close',
      { duration: 2000 }
    );
    this.logService.logEvent('movie_to_wishlist', {
      movie_name: movie.main.title.original,
      userId: this.authQuery.getValue().user.uid
    });
  }

  public removeFromWishlist(movie: Movie, event: Event) {
    event.stopPropagation();
    this.basketService.updateWishlist(movie);
    this.snackbar.open(
      `${movie.main.title.international} has been removed from your selection.`,
      'close',
      { duration: 2000 }
    );
    this.logService.logEvent('movie_removed_wishlist', {
      movie_name: movie.main.title.original,
      userId: this.authQuery.getValue().user.uid
    });
  }

  public getBanner(movie: Movie): string {
    const movieElement = movie.promotionalElements.promotionalElements.find(element => element.type === "banner");
    if (!movieElement || !movieElement.url) { return; }
    return (<ImgRef>movieElement.url).ref !== undefined ? (<ImgRef>movieElement.url).url : (<string>movieElement.url)
}
