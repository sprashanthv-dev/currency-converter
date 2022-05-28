import { Injectable } from "@angular/core";

import { EXCHANGE_RATES_CNST } from "../constants/proj.cnst";
import { MostTradedExchanges } from "../interfaces/most-traded-exchanges";
import { SplitValueOptions } from "../interfaces/split-value-options";

@Injectable({
  providedIn: "root"
})

export class DataService {

  //TODO : Handle Exchange Rate on switch
  switchCurrencyPair(currencyExchangeInfo: MostTradedExchanges): MostTradedExchanges {

    let {
      currencyPair,
      fullForm,
      srcImageUrl,
      destImageUrl,
      liveRate,
      srcDestRate,
      destSrcRate
    } = currencyExchangeInfo;

    let { DELIMITER_SYMBOLS } = EXCHANGE_RATES_CNST;

    [srcImageUrl, destImageUrl] = [destImageUrl, srcImageUrl];
    [srcDestRate, destSrcRate] = [destSrcRate, srcDestRate];

    let splitValueOptions: SplitValueOptions = {
      splitDelimiter: DELIMITER_SYMBOLS.HYPHEN,
      joinDelimiter: DELIMITER_SYMBOLS.COMMA
    }

    return {
      currencyPair: this.splitAndSwitch(currencyPair, splitValueOptions),
      fullForm: this.splitAndSwitch(fullForm, splitValueOptions),
      srcDestRate,
      destSrcRate,
      liveRate,
      srcImageUrl,
      destImageUrl
    };
  }

  splitAndSwitch(value: string, options: SplitValueOptions): string {

    let { DELIMITER_SYMBOLS } = EXCHANGE_RATES_CNST;

    let {
      splitDelimiter = DELIMITER_SYMBOLS.BLANK_SPACE,
      joinDelimiter = DELIMITER_SYMBOLS.BLANK_SPACE
    } = options;

    let parts = value.split(splitDelimiter);

    //* Swap values
    [parts[0], parts[1]] = [parts[1], parts[0]];

    //* Join back to a single string
    return parts.join(joinDelimiter);
  }
}