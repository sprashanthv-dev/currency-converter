import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxUiLoaderModule } from 'ngx-ui-loader';

import { ngxUiLoaderConfig } from '../constants/ngx-ui-loader.config';
import { LoaderComponent } from './loader/loader.component';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [
    LoaderComponent,
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  exports: [
    LoaderComponent,
    ErrorPageComponent
  ]
})
export class SharedModule { }
