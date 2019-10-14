import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { Movie, MovieQuery } from '@blockframes/movie/movie/+state';

function createOrg(org: any) {
  return {
    poster: 'posters',
    ...org,
  };
}
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
  public path$: Observable<string>;
  /** Observable to fetch all movies from the store */
  public moviesBySections$: Observable<CarouselSection[]>;

  constructor(private movieQuery: MovieQuery, private db: AngularFirestore) {}

  ngOnInit() {
    const latest$ = this.movieQuery.selectAll({
      filterBy: movies => movies.main.productionYear >= 2018
    });
    const scoring$ = this.movieQuery.selectAll({
      filterBy: movies => movies.salesInfo.scoring === 'a'
    });
    const prizes$ = this.movieQuery.selectAll({
      filterBy: movies => !!movies.festivalPrizes.prizes
    });

    this.path$ = this.db.doc('orgs/org1').valueChanges().pipe(
      map(org => createOrg(org).poster),
    );

    this.moviesBySections$ = combineLatest([latest$, scoring$, prizes$]).pipe(
      map(([latest, scoring, prizes]) => {
        return [
          { title: 'New Films', subline: '', movies: latest },
          {
            title: 'Best Sellers',
            subline: '',
            movies: scoring
          },
          {
            title: 'Awarded Films',
            subline: '',
            movies: prizes
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
  public save(path: string) {
    this.db.doc('orgs/org1').update({ poster: path });
  }

  public remove() {
    this.db.doc('orgs/org1').set({  });
  }
}
