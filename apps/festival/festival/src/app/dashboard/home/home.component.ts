import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MovieAnalytics } from '@blockframes/movie/+state/movie.firestore';
import { MovieService, MovieQuery } from '@blockframes/movie/+state';
import { map, switchMap, shareReplay } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { OrganizationQuery } from '@blockframes/organization/+state';
import { MovieBudgetForm } from '@blockframes/movie/form/budget/budget.form'

@Component({
  selector: 'festival-dashboard-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  public movieAnalytics$: Observable<MovieAnalytics[]>;
  public hasMovies$: Observable<boolean>;

  constructor(
    private movieQuery: MovieQuery,
    private movieService: MovieService,
    private orgQuery: OrganizationQuery
  ) { }

  formList
  ngOnInit() {
    this.formList = new MovieBudgetForm({ boxOffice: [{ value: 52, territory: 'germany', unit: 'boxoffice_dollar' }, 
    { value: 20, territory: 'france', unit: 'boxoffice_dollar' },   { value: 50, territory: 'spain', unit: 'boxoffice_dollar' }] });
    console.log(this.formList)

    this.movieAnalytics$ = this.movieQuery.analytics.selectAll();

    const titles$ = this.orgQuery.selectActive().pipe(
      switchMap(({ movieIds }) => this.movieService.valueChanges(movieIds)),
      map(movies => movies.filter(movie => movie.main.storeConfig.status === 'accepted')),
      shareReplay(1)
    )

    this.hasMovies$ = titles$.pipe(
      map(titles => !!titles.length)
    );

    this.sub = titles$.pipe(
      map(movies => movies.map(m => m.id)),
      switchMap(movieIds => this.movieService.syncWithAnalytics(movieIds))
    ).subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  displayedColumns = ['Territory', 'Value', 'Box Office'];
  add() {
    this.formList.controls.boxOffice.add({ value: Math.random(), territory: 'germany', unit: 'boxoffice_dollar' })
  }
}
