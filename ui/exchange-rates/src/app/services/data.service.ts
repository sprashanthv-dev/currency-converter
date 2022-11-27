import { Injectable } from "@angular/core";

import { EXCHANGE_RATES_CNST } from "../constants/proj.cnst";
import { CountryInfo } from "../interfaces/country-info";
import { MostTradedExchanges } from "../interfaces/most-traded-exchanges";
import { selectedCurrencyConfig } from "../interfaces/selected-currency-config";
import { SplitValueOptions } from "../interfaces/split-value-options";
import { UtilService } from "./util.service";

@Injectable({
  providedIn: "root"
})

export class DataService {

  constructor(private utilSrv: UtilService) { }

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
      joinDelimiter: DELIMITER_SYMBOLS.HYPHEN
    }

    return {
      currencyPair: this.splitAndSwitch(currencyPair, splitValueOptions),
      fullForm: this.splitAndSwitch(fullForm, splitValueOptions),
      srcDestRate,
      destSrcRate,
      liveRate: srcDestRate,
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

  buildCountryInfoObject(countryObj: CountryInfo): CountryInfo {
    let { alpha3, currencyId, currencyName, currencySymbol, id, name } = countryObj;
    let { HYPHEN } = EXCHANGE_RATES_CNST.DELIMITER_SYMBOLS;

    let flagSourceUrl = this.buildFlagIconPath(id.toLowerCase());
    let displayName = `${currencyName} ${HYPHEN} (${id})`;

    return { alpha3, currencyId, currencyName, currencySymbol, id, name, flagSourceUrl, displayName };
  }

  buildFlagIconPath(countryISOCode: string) {

    let { flagBasePath, imageFormat } = EXCHANGE_RATES_CNST.FLAG_CONFIG;
    let { DOT } = EXCHANGE_RATES_CNST.DELIMITER_SYMBOLS;

    if (this.utilSrv.isStringNotNullOrUndefinedAndNotEmpty(countryISOCode)) {
      return `${flagBasePath}/${countryISOCode}${DOT}${imageFormat}`;
    } else {
      return "";
    }
  }

  handleCurrencySymbolsOnSelection(
    currencyId : string | undefined | null, 
    currencyInfo : CountryInfo[]) {

    let symbol = null;

    if (!this.utilSrv.isNullOrUndefined(currencyId)) {
      let currencyItem = currencyInfo.filter((item : CountryInfo) => item.id === currencyId)[0];
      let { currencySymbol } = currencyItem;
      
      symbol = currencySymbol;
    }

    return symbol;
  }
}