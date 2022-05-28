import { Injectable } from "@angular/core";

import { mostTradedPairs } from "../constants/most-traded-pairs";
import { EXCHANGE_RATES_CNST } from "../constants/proj.cnst";
import { MostTradedExchanges } from "../interfaces/most-traded-exchanges";
import { UtilService } from "./util.service";

@Injectable({
  providedIn: "root"
})

export class ApiResponseFormatterService {

  constructor(private utilSrv: UtilService) { }

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
}