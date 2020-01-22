import { Injectable } from '@angular/core';
import { EntityState, ActiveState, EntityStore, StoreConfig } from '@datorama/akita';
import { ContractVersion } from './contract-version.model';

export interface ContractVersionState extends EntityState<ContractVersion, string>, ActiveState<string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'versions' })
export class ContractVersionStore extends EntityStore<ContractVersionState> {

  constructor() {
    super();
  }

}
