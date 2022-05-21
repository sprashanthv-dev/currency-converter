import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class UtilService {

  isStringEmpty(value: string): boolean {
    return value === "";
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
}