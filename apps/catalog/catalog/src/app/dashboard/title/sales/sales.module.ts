import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TitleSalesComponent } from './sales.component';
import { LineChartModule } from '@blockframes/ui/chart/line-chart/line-chart.module';

@NgModule({
  declarations: [TitleSalesComponent],
  imports: [
    CommonModule,
    LineChartModule,
    RouterModule.forChild([{ path: '', component: TitleSalesComponent }])
  ]
})
export class TitleSalesModule {}
