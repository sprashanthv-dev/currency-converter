import { Injectable } from "@angular/core";

import { mostTradedPairs } from "../constants/most-traded-pairs";
import { EXCHANGE_RATES_CNST } from "../constants/proj.cnst";
import { CountryInfo } from "../interfaces/country-info";
import { MostTradedExchanges } from "../interfaces/most-traded-exchanges";
import { DataService } from "./data.service";
import { UtilService } from "./util.service";

@Injectable({
  providedIn: "root"
})

export class ApiResponseFormatterService {

  constructor(
    private utilSrv: UtilService,
    private dataSrv: DataService) { }

  formatLiveExchangeRatesResponse(response: any[]): MostTradedExchanges[] {

    let { DELIMITER_SYMBOLS } = EXCHANGE_RATES_CNST;
    let liveExchangeRatesList: MostTradedExchanges[] = [];

    mostTradedPairs.forEach((pair: MostTradedExchanges) => {

      let modifiedPair = this.utilSrv.replaceString(
        pair.currencyPair,
        DELIMITER_SYMBOLS.HYPHEN,
        DELIMITER_SYMBOLS.UNDERSCORE
      );

      let currencyPairIndex = response.findIndex(item => item[modifiedPair]);

      if (currencyPairIndex !== - 1) {

        let liveExchangeRates = response[currencyPairIndex];

        if (this.utilSrv.isObjectNotNullOrUndefinedAndNotEmpty(liveExchangeRates)) {

          let values: number[] = Object.values(liveExchangeRates);

          if (!this.utilSrv.isArrayEmpty(values)) {
            liveExchangeRatesList.push({ ...pair, srcDestRate: values[0], destSrcRate: values[1], liveRate: values[0] })
          }
        }
      }
    })

    return liveExchangeRatesList;
  }

  formatCountriesListResponse(response: any): CountryInfo[] {
    let countriesInfo: CountryInfo[] = [];

    if (this.utilSrv.isObjectNotNullOrUndefinedAndNotEmpty(response)) {
      let countryISOCodes = Object.keys(response);

      if (!this.utilSrv.isArrayEmpty(countryISOCodes)) {

        for (let countryISOCode of countryISOCodes) {
          let countryInfo = response[countryISOCode];

          if (this.utilSrv.isObjectNotNullOrUndefinedAndNotEmpty(countryInfo)) {
            let finalCountryInfo = this.dataSrv.buildCountryInfoObject(countryInfo);
            countriesInfo.push(finalCountryInfo);
          }
        }
      }
    }

    return countriesInfo;
  }
}