import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef, OnInit } from '@angular/core';
import { MovieSalesInfoForm } from '../../sales-info/sales-info.form';
import { MovieForm } from '../../movie.form';

@Component({
  selector: '[salesInfo] [main] movie-summary-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieSummaryCountryComponent implements OnInit {
  @Input() salesInfo: MovieSalesInfoForm;
  @Input() movie: MovieForm;
  @Input() link: string;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.salesInfo.valueChanges.subscribe(_ => this.cdr.markForCheck());
    this.movie.valueChanges.subscribe(_ => this.cdr.markForCheck());
  }
}
