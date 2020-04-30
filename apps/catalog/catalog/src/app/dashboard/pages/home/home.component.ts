import { DynamicTitleService } from '@blockframes/utils/dynamic-title/dynamic-title.service';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MovieQuery } from '@blockframes/movie/+state/movie.query';
import { Observable, Subscription } from 'rxjs';
import { MovieAnalytics } from '@blockframes/movie/+state/movie.firestore';
import { MovieService } from '@blockframes/movie/+state/movie.service';

@Component({
  selector: 'catalog-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  public movieAnalytics$: Observable<MovieAnalytics[]>;
  public movies$ = this.movieQuery.selectAll({ filterBy: movie => movie.main.storeConfig.status === 'accepted' });
  public moviesLoading$ = this.movieQuery.selectLoading();
  private sub: Subscription;

  constructor(
    private movieQuery: MovieQuery,
    private movieService: MovieService,
    private dynTitle: DynamicTitleService
  ) { }

  ngOnInit() {
    this.sub = this.movieService.syncAnalytics({ filterBy: movie => movie.main.storeConfig.status === 'accepted' }).subscribe();
    this.movieAnalytics$ = this.movieQuery.analytics.selectAll();
    this.movieQuery.getCount()
      ? this.dynTitle.setPageTitle('Seller\'s Dashboard')
      : this.dynTitle.setPageTitle('New Title')
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
