import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class UtilService {

  isStringEmpty(value: string | undefined): boolean {
    return value === "";
  }

  isStringUndefined(value : string | null | undefined) : boolean {
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
}