import { Injectable } from "@angular/core";
import { MostTradedExchanges } from "../interfaces/most-traded-exchanges";

@Injectable({
  providedIn: "root"
})

export class DataService {

  //TODO : Handle Exchange Rate on switch
  switchCurrencyPair(currencyExchangeInfo: MostTradedExchanges): MostTradedExchanges {

    let { currencyPair, fullForm, srcImageUrl, destImageUrl, liveRate } = currencyExchangeInfo;

    [srcImageUrl, destImageUrl] = [destImageUrl, srcImageUrl];

    return {
      currencyPair: this.splitAndSwitch(currencyPair, "-"),
      fullForm: this.splitAndSwitch(fullForm, "-"),
      liveRate,
      srcImageUrl,
      destImageUrl
    };
  }

  splitAndSwitch(value: string, delimiter: string = ""): string {
    let parts = value.split(delimiter);

    //* Swap values
    [parts[0], parts[1]] = [parts[1], parts[0]];

    //* Join back to a single string
    return parts.join(delimiter);
  }
}