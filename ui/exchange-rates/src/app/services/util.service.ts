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

}