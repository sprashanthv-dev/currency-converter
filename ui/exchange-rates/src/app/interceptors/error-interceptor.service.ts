import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";

import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators"
import { EXCHANGE_RATES_CNST } from "../constants/proj.cnst";

@Injectable({
  "providedIn": "root"
})

export class ErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        let errorMessage = "";

        if (error.error instanceof ErrorEvent) {
          //* Client-side error
          errorMessage = `${error.error.message}`;
        } else {
          //* Server-side error
          errorMessage = EXCHANGE_RATES_CNST.API_ERROR_MESSAGES.SERVER_DOWN;
        }

        return throwError(() => new Error(errorMessage));
      })
    )
  }
}