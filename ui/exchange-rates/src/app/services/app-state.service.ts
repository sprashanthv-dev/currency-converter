import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { EXCHANGE_RATES_CNST } from "../constants/proj.cnst";
import { LoaderConfig } from "../interfaces/loader-config";

@Injectable({
  "providedIn": "root"
})

export class AppStateService {

  loaderInfo: LoaderConfig | undefined;
  loaderRef = new BehaviorSubject<LoaderConfig>(EXCHANGE_RATES_CNST.START_MASTER_LOADER_CONFIG);

  setLoaderInfo(loaderConfig: LoaderConfig) {
    this.loaderInfo = loaderConfig;
    this.loaderRef.next(this.loaderInfo);
  }
}