import {Component, OnInit} from '@angular/core';

import {mostTradedPairs} from '../../constants/most-traded-pairs';
import {EXCHANGE_RATES_CNST} from '../../constants/proj.cnst';

import {MostTradedExchanges} from '../../interfaces/most-traded-exchanges';

import {DataService} from '../../services/data.service';
import {UtilService} from '../../services/util.service';
import {ApiResponseFormatterService} from '../../services/api-response-formatter.service';
import {ApiService} from '../../services/api.service';
import {AppStateService} from '../../services/app-state.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mostTradedCurrencyPairs: MostTradedExchanges[] = [];
  mostTradedCurrencyPairsFiltered: MostTradedExchanges[] = [];

  currencyPairNamesList: string[] = [];
  loaderConfig = EXCHANGE_RATES_CNST.LOADER_OPTIONS;

  errorCode: number = 500;
  isMostTradedCurrencyPairsNotLoaded: boolean = true;

  constructor(
    private router : Router,
    private apiSrv: ApiService,
    private apiResponseFormatterSrv: ApiResponseFormatterService,
    private utilSrv: UtilService,
    private dataSrv: DataService,
    private appStateSrv: AppStateService) { }

  ngOnInit(): void {
    this.currencyPairNamesList = mostTradedPairs.map((pair: MostTradedExchanges) => pair.currencyPair);
    // this.fetchLiveExchangeRates();

    this.mostTradedCurrencyPairs = mostTradedPairs;
    this.mostTradedCurrencyPairsFiltered = this.mostTradedCurrencyPairs;
    this.isMostTradedCurrencyPairsNotLoaded = false;
  }

  async fetchLiveExchangeRates() {

    this.apiSrv
      .fetchLiveExchangeRates(this.currencyPairNamesList)
      .then((liveExchangeRates: any) => {
        this.mostTradedCurrencyPairs = this.apiResponseFormatterSrv.formatLiveExchangeRatesResponse(liveExchangeRates);
        this.mostTradedCurrencyPairsFiltered = this.mostTradedCurrencyPairs;

        this.appStateSrv.setLoaderInfo(EXCHANGE_RATES_CNST.STOP_MASTER_LOADER_CONFIG);
        this.isMostTradedCurrencyPairsNotLoaded = false;
      })
      .catch((error: Error) => {
        console.log('Error ', error.name, " ", error.message);
        this.isMostTradedCurrencyPairsNotLoaded = true;
      })
      .finally(() => {
        this.appStateSrv.setLoaderInfo(EXCHANGE_RATES_CNST.STOP_MASTER_LOADER_CONFIG);
      });
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

      let isValidObject = this.utilSrv.isObjectNotNullOrUndefinedAndNotEmpty(exchangePairInfo);

      if (isValidObject) {
        this.mostTradedCurrencyPairsFiltered[exchangePairIndex] = this.dataSrv.switchCurrencyPair(exchangePairInfo);
      }
    }
  }

  handleRateClick() {
    this.router.navigate(['', 'get-your-rate']);
  }

}
