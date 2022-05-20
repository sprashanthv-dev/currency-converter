import { Component, OnInit } from '@angular/core';

import { mostTradedPairs } from '../../constants/most-traded-pairs';
import { MostTradedExchanges } from '../../interfaces/most-traded-exchanges';
import { DataService } from '../../services/data.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mostTradedCurrencyPairs: MostTradedExchanges[] = [];
  mostTradedCurrencyPairsFiltered: MostTradedExchanges[] = [];

  constructor(
    private utilSrv: UtilService,
    private dataSrv: DataService) { }

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

  handleCurrencyPairSwitch(currencyPair: string) {
    let exchangePairIndex = this.mostTradedCurrencyPairsFiltered
      .findIndex((item: MostTradedExchanges) => item.currencyPair === currencyPair);

    if (exchangePairIndex !== -1) {
      let exchangePairInfo = this.mostTradedCurrencyPairsFiltered[exchangePairIndex];

      let isValidObject = !this.utilSrv.isNullOrUndefined(exchangePairInfo)
        && this.utilSrv.isObjectNotEmpty(exchangePairInfo);

      if (isValidObject) {
        let modifiedCurrencyPairInfo = this.dataSrv.switchCurrencyPair(exchangePairInfo);
        this.mostTradedCurrencyPairsFiltered[exchangePairIndex] = modifiedCurrencyPairInfo;
      }
    }
  }

}
