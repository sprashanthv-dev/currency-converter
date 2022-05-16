import { Component, OnInit } from '@angular/core';

import { MostTradedExchanges } from './interfaces/most-traded-exchanges';
import { mostTradedPairs } from './constants/most-traded-pairs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  mostTradedCurrencyPairs: MostTradedExchanges[] = [];

  ngOnInit(): void {
    this.mostTradedCurrencyPairs = mostTradedPairs;
  }
}
