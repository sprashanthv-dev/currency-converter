import {Injectable} from "@angular/core";
import {EXCHANGE_RATES_CNST} from "../constants/proj.cnst";

@Injectable({
  providedIn: 'root'
})

export class UtilService {

  delimiterSymbols = EXCHANGE_RATES_CNST.DELIMITER_SYMBOLS;

  isStringEmpty(value: string | undefined): boolean {
    return value === "";
  }

  isStringUndefined(value: string | null | undefined): boolean {
    return value === undefined;
  }

  areStringsEmpty(values: string[]): boolean {
    return values.every((value: string) => this.isStringEmpty(value));
  }

  isArrayEmpty(value: any[]): boolean {
    return value.length === 0;
  }

  isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
  }

  isObjectNotEmpty(value: any): boolean {
    return Object.keys(value).length > 0;
  }

  isObjectNotNullOrUndefinedAndNotEmpty(value: any): boolean {
    return !this.isNullOrUndefined(value)
      && this.isObjectNotEmpty(value);
  }

  isStringNotNullOrUndefinedAndNotEmpty(value: string | undefined): boolean {
    return !this.isNullOrUndefined(value)
      && !this.isStringEmpty(value);
  }

  replaceString(inputString: string, searchString: string, replacementString: string): string {

    let result = !this.areStringsEmpty([searchString, replacementString])
      ? inputString.replace(searchString, replacementString)
      : inputString;

    return result;
  }

  splitString(str: string | undefined, delimiter: string) {

    if (!this.isStringNotNullOrUndefinedAndNotEmpty(str) ||
      !this.isStringNotNullOrUndefinedAndNotEmpty(delimiter)) {
      return str;
    } else {
      // @ts-ignore
      return str.split(delimiter);
    }
  }

  capitalizeFirstLetter(str: string | undefined) {

    let modifiedStr = "";

    if (!this.isStringNotNullOrUndefinedAndNotEmpty(str)) {
      return str;
    } else {
      let parts = this.splitString(str, this.delimiterSymbols.SINGLE_SPACE);

      // @ts-ignore
      for (let part of parts) {
        modifiedStr += `${part.substring(0, 1).toUpperCase()}${part.slice(1)}${this.delimiterSymbols.SINGLE_SPACE}`;
      }
    }

    return modifiedStr;
  }
}
