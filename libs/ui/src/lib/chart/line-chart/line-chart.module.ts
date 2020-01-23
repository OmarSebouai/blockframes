import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartComponent } from './line-chart.component';
import { ChartModule } from '../chart.module';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [LineChartComponent],
  imports: [
    CommonModule,
    ChartModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
  ],
  exports: [LineChartComponent]
})
export class LineChartModule {
}

