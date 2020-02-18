import { Injectable } from '@angular/core';
import { CollectionGuard, CollectionGuardConfig, awaitSyncQuery, Query } from 'akita-ng-fire';
import { MovieState, MovieService, MovieStore, Movie } from '../+state';
import { ContractQuery } from '@blockframes/contract/contract/+state/contract.query';
import { tap, switchMap } from 'rxjs/operators';
import { OrganizationQuery } from '@blockframes/organization';

/** Query movies from the contract with distributions deals from the last version. */
const movieListContractQuery = (contractId: string, movieIds: string[]): Query<Movie[]> => ({
  path: 'movies',
  queryFn: ref => ref.where('id', 'in', movieIds),
  distributionDeals: (movie: Movie) => ({
    path: `movies/${movie.id}/distributionDeals`,
    queryFn: ref => ref.where('contractId', '==', contractId)
  })
});

@Injectable({ providedIn: 'root' })
@CollectionGuardConfig({ awaitSync: true })
export class MovieContractGuard extends CollectionGuard<MovieState> {
  constructor(
    protected service: MovieService,
    private store: MovieStore,
    private contractQuery: ContractQuery,
    private organizationQuery: OrganizationQuery
  ) {
    super(service);
  }

  /**
   * Sync on movies from contract.titleIds.
   * It means that this guard must always be used after the ActiveContractGuard.
  */
  sync() {
    return this.contractQuery.selectActive().pipe(
      // Reset the store everytime the movieId changes.
      tap(_ => this.store.reset()),
      switchMap(contract => {
        // Filter movieIds before the query to relieve it.
        const organizationMovieIds = this.organizationQuery.getActive().movieIds;
        const movieIds = contract.titleIds.filter(titleId => organizationMovieIds.includes(titleId));

        return awaitSyncQuery.call(this.service, movieListContractQuery(contract.id, movieIds))
      })
    );
  }
}
