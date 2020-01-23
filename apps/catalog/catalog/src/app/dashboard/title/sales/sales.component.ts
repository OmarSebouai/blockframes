import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

const analytics_data = {
  addedToWishlist: 
  [ 
    { 
      event_date: Date, 
      event_name: 'addded_to_wishlist', 
      hits: 50 
    }, 
    { 
      event_date: Date,
      event_name: 'addded_to_wishlist', 
      hits: 30
    }
  ],
  movieViews: 
  [ 
    {
      event_date: Date, 
      event_name: 'page_view', 
      hits: 40 
    }, 
    {
      event_date: Date, 
      event_name: 'page_view', 
      hits: 10 
    } 
  ],
  promoReelOpened: []
}
@Component({
  selector: 'catalog-title-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleSalesComponent implements OnInit {
  movieViews: ApexAxisChartSeries = [{
    name: 'movieViews',
    data: []
  }]
  addedToWishlist: ApexAxisChartSeries = [{
    name: 'addded_to_wishlist',
    data: []
  }]
  
  constructor() { }

  ngOnInit() {
    this.movieViews[0].data = analytics_data.movieViews.map(d => d.hits)
    this.addedToWishlist[0].data = analytics_data.addedToWishlist.map(d => d.hits)
  }
}
