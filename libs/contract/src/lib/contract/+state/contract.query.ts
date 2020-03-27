import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ContractStore, ContractState } from './contract.store';
import { map, shareReplay, distinctUntilChanged, pluck, switchMap, filter } from 'rxjs/operators';
import { getVersionView } from './contract.utils';
import { MovieQuery } from '@blockframes/movie/+state/movie.query';
import { Contract } from './contract.model';
import { Party } from '@blockframes/utils/common-interfaces/identity';

@Injectable({ providedIn: 'root' })
export class ContractQuery extends QueryEntity<ContractState> {

  /** There is only one mandate per organization */
  mandate$ = this.selectEntity((contract: Contract) => contract.type === 'mandate');
  sales$ = this.selectAll({ filterBy: contract => contract.type === 'sale' });

  // @todo(#1887)
  // don't look for the last version + move it to version query
  // Remove filter on _meta id
  public activeVersion$ = this.selectActive().pipe(
    filter(contract => !!contract),
    map(contract => contract.versions.filter(version => version.id !== '_meta')),
    map(versions => versions[versions.length - 1])
  );

  public activeVersionView$ = this.activeVersion$.pipe(
    map(getVersionView),
    shareReplay()
  );

  /** Get all movies of a contract */
  public titles$ = this.activeVersionView$.pipe(
    pluck('titleIds'),
    distinctUntilChanged((prev, next) => prev.length === next.length),
    switchMap(titeIds => this.movieQuery.selectMany(titeIds))
  )

  public oldVersionsView$ = this.selectActive().pipe(
    filter(contract => !!contract),
    map(contract => contract.versions.filter(version => version.id !== '_meta')),
    map(versions => versions.filter((_, i) => i !== versions.length - 1)),
    map(versions => versions.map(getVersionView))
  );

  /** Get subLicensors of the active contract */
  public subLicensors$ = this.selectActive().pipe(
    filter(contract => !!contract),
    map(contract => contract.parties.filter(p => p.childRoles.length > 0))
  );

  constructor(protected store: ContractStore, private movieQuery: MovieQuery) {
    super(store);
  }

  getMandate() {
    this.getEntity((contract: Contract) => contract.type === 'mandate')
  }

  /** Returns the contract parties of a given role */
  getActiveParties(role: 'licensee' | 'licensor'): Party[] {
    const parties = this.getActive().parties.filter(details => details.party.role === role);
    return parties.map(details => details.party);
  }

}
