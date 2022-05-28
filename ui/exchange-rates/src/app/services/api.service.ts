import { Injectable } from "@angular/core";

import { HttpService } from "./http.service";
import { UtilService } from "./util.service";

import { EXCHANGE_RATES_CNST } from "../constants/proj.cnst";
import { SplitValueOptions } from "../interfaces/split-value-options";
import { DataService } from "./data.service";

@Injectable({
  providedIn: "root"
})

export class ApiService {

  constructor(
    private httpSrv: HttpService,
    private utilSrv: UtilService,
    private dataSrv: DataService) { }

  async fetchLiveExchangeRates(currencyPairs: any[]): Promise<any[]> {
    let response = await Promise.all([...this.buildPromiseChainsForExchangeRates(currencyPairs)]);
    return response;
  }

  buildPromiseChainsForExchangeRates(currencyPairs: any[]): Promise<any>[] {

    let { DELIMITER_SYMBOLS } = EXCHANGE_RATES_CNST;

    let hyphen = DELIMITER_SYMBOLS.HYPHEN;
    let underscore = DELIMITER_SYMBOLS.UNDERSCORE

    let promises: Promise<any>[] = [];

    currencyPairs.forEach((currencyPair: string) => {

      let splitValueOptions: SplitValueOptions = {
        splitDelimiter: hyphen,
        joinDelimiter: underscore
      }

      let reverseExchangePair = this.dataSrv.splitAndSwitch(currencyPair, splitValueOptions);
      let replacedCurrencyPair = this.utilSrv.replaceString(currencyPair, hyphen, underscore)

      let promise = new Promise((resolve, reject) => {

        let options = {
          'queryParams': {
            'q': [replacedCurrencyPair, reverseExchangePair],
            'compact': 'ultra'
          }
        }

        this.httpSrv
          .makeGetRequest('GET_RATE_BETWEEN_CURRENCY_PAIRS', options)
          .subscribe({
            next: (response: any) => resolve(response),
            error: (err: any) => reject(err)
          });
      })

      promises.push(promise);
    })

    return promises;
  }

}