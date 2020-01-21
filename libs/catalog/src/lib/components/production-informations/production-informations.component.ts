import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Stakeholder } from '@blockframes/utils/common-interfaces/identity';
import { ImgRef } from '@blockframes/utils';

@Component({
  selector: 'catalog-production-informations',
  templateUrl: './production-informations.component.html',
  styleUrls: ['./production-informations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogProductionInformationsComponent {
  @Input() stakeholders: Stakeholder[];
  @Input() salesAgentDealAvatar: ImgRef;
}
