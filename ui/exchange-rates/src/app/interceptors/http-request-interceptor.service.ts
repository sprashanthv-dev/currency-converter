import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_SECRETS } from "../secrets/api_secrets";

@Injectable({
  providedIn: "root"
})

export class HttpRequestInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("Inside interceptor ...");

    let modifiedParams = req.params;

    modifiedParams = modifiedParams.append('apiKey', API_SECRETS.API_KEY);

    const modifiedRequest = req.clone({ params: modifiedParams });
    return next.handle(modifiedRequest);
  }
}