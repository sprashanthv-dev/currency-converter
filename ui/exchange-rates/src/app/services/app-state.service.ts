import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { LoaderConfig } from "../interfaces/loader-config";

@Injectable({
  "providedIn": "root"
})

export class AppStateService {

  loaderInfo: LoaderConfig | undefined;
  loaderRef = new Subject<LoaderConfig>();

  setLoaderInfo(loaderConfig: LoaderConfig) {
    this.loaderInfo = loaderConfig;
    this.loaderRef.next(this.loaderInfo);
  }
}