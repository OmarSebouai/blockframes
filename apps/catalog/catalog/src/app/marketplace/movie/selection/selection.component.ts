import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { MarketplaceQuery, MarketplaceStore } from '../../+state';
import { MovieQuery } from '@blockframes/movie';
import { ContractService, Contract, ContractTitleDetail, ContractType, createContractPartyDetail } from '@blockframes/contract/contract/+state';
import { ContractVersion } from '@blockframes/contract/version/+state';
import { CommissionBase, createParty } from '@blockframes/utils/common-interfaces';
import { Observable } from 'rxjs';
import { OrganizationQuery } from '@blockframes/organization';
import { DistributionDealService } from '@blockframes/movie/distribution-deals';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'catalog-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketplaceSelectionComponent {
  @HostBinding('attr.page-id') pageId = 'catalog-selection';

  count$ = this.query.selectCount();
  titles$ = this.query.selectAll();
  isInWishist$: Observable<Record<string, Observable<boolean>>>;

  constructor(
    public store: MarketplaceStore,
    private db: AngularFirestore,
    private query: MarketplaceQuery,
    private service: ContractService,
    private dealService: DistributionDealService,
    private movieQuery: MovieQuery,
    private orgQuery: OrganizationQuery,
    private router: Router,
  ) {}

  /** Select a movie for a specific movie Id */
  selectMovie(movieId: string) {
    return this.movieQuery.selectEntity(movieId);
  }

  removeTitle(movieId: string) {
    this.store.remove(movieId);
  }

  /** Create a Contract, remove the current selection, move to tunnel */
  async create() {
    const org = this.orgQuery.getActive();
    // Initialize parties
    const parties: Contract['parties'] = [
      createContractPartyDetail({
        party: createParty({ role: 'licensee', orgId: org.id, displayName: org.name }),
      }),
      createContractPartyDetail({ party: createParty({ role: 'licensor' }) })
    ];
    const titleIds = this.query.getValue().ids;
  
    // Create contract & Version
    const contract: Partial<Contract> = { titleIds, parties, type: ContractType.sale };
    const version: Partial<ContractVersion> = { titles: {} };
    for (const movieId of titleIds) {
      (version.titles[movieId] as Partial<ContractTitleDetail>) = {
        price: { commissionBase: CommissionBase.grossreceipts, amount: 0, currency: 'USD' }
      };
    }
    const contractId = await this.service.create(contract, version);
    
    // Create deals
    const write = this.db.firestore.batch();
    for (const movieId of titleIds) {
      const { deals } = this.query.getEntity(movieId);
      this.dealService.add(deals, { write, params: { movieId } });
    }
    await write.commit();
    await this.router.navigate(['c/o/marketplace/tunnel/contract', contractId, 'sale']);
    this.store.reset();
  }

}
