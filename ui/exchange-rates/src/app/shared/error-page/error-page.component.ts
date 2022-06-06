import { Component, Input, OnInit } from '@angular/core';
import { EXCHANGE_RATES_CNST } from 'src/app/constants/proj.cnst';
import { ErrorPageConfig } from 'src/app/interfaces/error-page-config';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  @Input() errorCode: number = 404;

  errorConfig: ErrorPageConfig | undefined;
  errorConfigs: ErrorPageConfig[] = EXCHANGE_RATES_CNST.ERROR_PAGE_CONFIGS;

  constructor() { }

  ngOnInit(): void {
    let errorConfigIndex = this.errorConfigs.findIndex((errorConfig: ErrorPageConfig) => errorConfig.errorCode === this.errorCode);

    if (errorConfigIndex !== -1) {
      this.errorConfig = this.errorConfigs[errorConfigIndex];
    }
  }

}
