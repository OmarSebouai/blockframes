import { MovieService } from './../+state/movie.service';
import { MovieState } from './../+state/movie.store';
import { Injectable } from '@angular/core';
import { CollectionGuard } from 'akita-ng-fire';
import { MovieQuery } from '../+state/movie.query';
import { StoreStatus } from '../+state/movie.firestore';

@Injectable({ providedIn: 'root' })
export class MovieCollectionGuard extends CollectionGuard<MovieState> {
  constructor(protected service: MovieService, private query: MovieQuery) {
    super(service);
  }

  get awaitSync() {
    return this.query.getCount() === 0;
  }

  sync() {
    return this.service.syncMoviesWithDeals();
  }
}
