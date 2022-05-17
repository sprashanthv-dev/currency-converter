import { Component, OnInit } from '@angular/core';

import { MostTradedExchanges } from './interfaces/most-traded-exchanges';
import { mostTradedPairs } from './constants/most-traded-pairs';
import { UtilService } from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  mostTradedCurrencyPairs: MostTradedExchanges[] = [];
  mostTradedCurrencyPairsFiltered: MostTradedExchanges[] = [];

  constructor(private utilSrv: UtilService) { }

  ngOnInit(): void {
    this.mostTradedCurrencyPairs = mostTradedPairs;
    this.mostTradedCurrencyPairsFiltered = this.mostTradedCurrencyPairs;
  }

  handleCountryNameSearch(searchTerm: string) {

    this.mostTradedCurrencyPairsFiltered = !this.utilSrv.isStringEmpty(searchTerm)
      ? this.performFilter(searchTerm)
      : this.mostTradedCurrencyPairs;
  }

  performFilter(searchTerm: string): MostTradedExchanges[] {
    return this.mostTradedCurrencyPairs.filter(
      (currencyPair: MostTradedExchanges) => currencyPair.fullForm.toLowerCase()
        .includes(searchTerm.toLowerCase()));
  }
}
