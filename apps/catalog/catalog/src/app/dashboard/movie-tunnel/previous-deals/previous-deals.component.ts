import { FormList } from '@blockframes/utils/form/forms/list.form';
import { ContractForm, PartyDetailsForm } from '@blockframes/contract/contract/forms/contract.form';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { DistributionDealForm } from '@blockframes/movie/distribution-deals/form/distribution-deal.form';
import { ContractPartyForm } from '@blockframes/contract/contract/forms/party-name/party-name.form';

@Component({
  selector: 'catalog-tunnel-previous-deals',
  templateUrl: './previous-deals.component.html',
  styleUrls: ['./previous-deals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TunnelPreviousDealsComponent implements OnInit {
  private formContract: FormList<any, ContractForm>;
  private formDistributionDeal: FormList<any, DistributionDealForm>;

  public loading: boolean;

  constructor(private routerQuery: RouterQuery) {}

  ngOnInit() {}

  public contract(index: number) {
    return this.formContract.at(index);
  }

  public distributionDeal(index: number) {
    return this.formDistributionDeal.at(index);
  }

  public contractParty(index: number) {
    return this.formContract.at(index);
  }

  public distributionDealTerms(index: number) {
    return this.formDistributionDeal.at(index).get('terms');
  }

  public addContract() {
    this.formContract
      ? (this.formContract.push(new ContractForm()),
        this.formDistributionDeal.push(new DistributionDealForm()))
      : ((this.formContract = FormList.factory([], contract => new ContractForm(contract))),
        (this.formDistributionDeal = FormList.factory(
          [],
          distribution => new DistributionDealForm(distribution)
        )));
  }
}
