import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ContractTunnelComponent } from '../contract-tunnel.component';

@Component({
  selector: 'contract-details-mandate',
  templateUrl: './details-mandate.component.html',
  styleUrls: ['./details-mandate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsMandateComponent {

  constructor(private tunnel: ContractTunnelComponent) { }

  get parties() {
    return this.tunnel.contractForm.get('parties');
  }

  get versions() {
    return this.tunnel.contractForm.get('versions');
  }

  public terms(index: number) {
    return this.versions.at(index).get('scope');
  }

  public conditions(index: number) {
    return this.versions.at(index).get('renewalConditions')
  }

  public terminations(index: number) {
    return this.versions.at(index).get('terminationConditions');
  }

  public fees(index: number) {
    return this.versions.at(index).get('authorizedRecoupableExpenses')
  }
}
