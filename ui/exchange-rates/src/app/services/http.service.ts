import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { EXCHANGE_RATES_CNST } from "../constants/proj.cnst";
import { UtilService } from "./util.service";

@Injectable({
  providedIn: "root"
})

export class HttpService {

  constructor(
    private http: HttpClient,
    private utilSrv: UtilService) { }

  makeGetRequest(apiKey: string, options: any, baseUrl?: string): Observable<any> {
    let apiEndPoint = this.getApiEndPoint(apiKey);
    let additionalHeaders;

    if (!this.utilSrv.isNullOrUndefined(options) && this.utilSrv.isObjectNotEmpty(options)) {
      let { uriParams, queryParams, headers, queryParamPrefix } = options;

      let isQueryParamPrefixPresent = this.utilSrv.isObjectNotNullOrUndefinedAndNotEmpty(queryParamPrefix);

      if (this.utilSrv.isObjectNotNullOrUndefinedAndNotEmpty(uriParams)) {
        apiEndPoint = `${apiEndPoint}/${this.buildUriParams(uriParams)}`;
      }

      if (this.utilSrv.isObjectNotNullOrUndefinedAndNotEmpty(queryParams)) {

        apiEndPoint = !isQueryParamPrefixPresent
          ? `${apiEndPoint}?${this.buildQueryParams(queryParams)}`
          : `${apiEndPoint}?${queryParamPrefix}=${this.buildQueryParams(queryParams)}`
      }

      if (this.utilSrv.isObjectNotNullOrUndefinedAndNotEmpty(headers)) {
        additionalHeaders = this.buildHeaders(headers);
      }

      baseUrl = !this.utilSrv.isNullOrUndefined(baseUrl) ? baseUrl : EXCHANGE_RATES_CNST.BASE_URL;
    }

    return this.http.get(`${baseUrl}/${apiEndPoint}`, { headers: additionalHeaders })
  }

  getApiEndPoint(apiKey: string): string {

    let { API_MAPPING, API_ERROR_MESSAGES } = EXCHANGE_RATES_CNST;


    if (this.utilSrv.isNullOrUndefined(apiKey) || this.utilSrv.isStringEmpty(apiKey)) {
      return API_ERROR_MESSAGES.API_ENDPOINT_NULL_UNDEFINED_EMPTY;
    }


    if (!this.utilSrv.isNullOrUndefined(API_MAPPING[apiKey])) {
      return API_MAPPING[apiKey];
    } else {
      return API_ERROR_MESSAGES.API_ENDPOINT_NOT_FOUND;
    }
  }

  buildUriParams(uriParams: any): string {

    let uriParamsStr = '';
    let keysLength = Object.keys(uriParams).length;
    let counter = 1;

    for (let uriParam in uriParams) {
      let uriParamValue = uriParams[uriParam];

      uriParamValue = counter !== keysLength
        ? `${uriParamValue}/` : `${uriParamValue}`;

      uriParamsStr += uriParamValue;
      counter++;
    }

    return uriParamsStr;
  }

  buildQueryParams(queryParams: any): HttpParams {
    let params = new HttpParams();

    for (let queryParam in queryParams) {
      let queryParamValue = queryParams[queryParam];
      params = params.append(queryParam, queryParamValue);
    }

    return params;
  }

  buildHeaders(headerConfig: any): HttpHeaders {
    let headers = new HttpHeaders();

    for (let header in headerConfig) {
      let headerValue = headerConfig[header];

      headers = headers.append(header, headerValue);
    }

    return headers;
  }
}