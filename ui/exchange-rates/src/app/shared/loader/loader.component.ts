import { Component, OnDestroy, OnInit } from '@angular/core';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';
import { EXCHANGE_RATES_CNST } from 'src/app/constants/proj.cnst';

import { LoaderConfig } from 'src/app/interfaces/loader-config';
import { AppStateService } from 'src/app/services/app-state.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {

  loaderName: string = "";
  loaderType: string = "";

  subscriptions: Subscription[] = [];

  constructor(
    private ngxUiLoader: NgxUiLoaderService,
    private utilSrv: UtilService,
    private appStateSrv: AppStateService) { }

  ngOnInit(): void {

    const loaderRef = this.appStateSrv.loaderRef
      .subscribe((loaderConfig: LoaderConfig) => {
        this.processLoaderConfig(loaderConfig);
      })

    this.subscriptions.push(loaderRef);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  processLoaderConfig(loaderConfig: LoaderConfig) {
    let { loaderName, loaderType, operationType } = loaderConfig;
    let { LOADER_OPTIONS } = EXCHANGE_RATES_CNST;

    this.loaderName = loaderName;
    this.loaderType = loaderType;

    if (operationType === LOADER_OPTIONS.START_LOADER) {
      this.startLoader(this.loaderName);
    } else {
      this.stopLoader(this.loaderName);
    }
  }

  startLoader(loaderName: string = "") {

    //* If a loader name is passed then it is a non-master loader
    if (this.utilSrv.isStringNotNullOrUndefinedAndNotEmpty(loaderName)) {
      this.ngxUiLoader.startLoader(loaderName);
    } else {
      //* Load the master loader
      this.ngxUiLoader.start();
    }
  }

  stopLoader(loaderName: string = "") {
    if (this.utilSrv.isStringNotNullOrUndefinedAndNotEmpty(loaderName)) {
      this.ngxUiLoader.stopLoader(loaderName);
    } else {
      this.ngxUiLoader.stop();
    }
  }
}
