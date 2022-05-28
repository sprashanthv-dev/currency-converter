import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxUiLoaderModule } from 'ngx-ui-loader';

import { ngxUiLoaderConfig } from '../constants/ngx-ui-loader.config';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  exports: [
    LoaderComponent
  ]
})
export class SharedModule { }
