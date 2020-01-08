import { Injectable } from '@angular/core';
import { CollectionGuard, CollectionGuardConfig } from 'akita-ng-fire';
import { DistributionDealState } from '../+state/distribution-deal.store';
import { DistributionDealService } from '../+state/distribution-deal.service';

@Injectable({ providedIn: 'root' })
@CollectionGuardConfig({ awaitSync: true })
export class ActiveMovieDistributionDealsGuard extends CollectionGuard<DistributionDealState> {
  constructor(service: DistributionDealService) {
    super(service);
  }

  sync() {
    return this.service.syncCollection();
  }
}
