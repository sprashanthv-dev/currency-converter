import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { PageRoutingRoutingModule } from './page-routing.module';

import { GetYourRateComponent } from './get-your-rate/get-your-rate.component';
import { HomeComponent } from './home/home.component';
import { MostTradedExchangesComponent } from './most-traded-exchanges/most-traded-exchanges.component';
import { GetYourRateModule } from './get-your-rate/get-your-rate.module';

@NgModule({
  declarations: [
    HomeComponent,
    GetYourRateComponent,
    MostTradedExchangesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    GetYourRateModule,
    PageRoutingRoutingModule
  ],
  exports: [
    HomeComponent,
    GetYourRateComponent,
    MostTradedExchangesComponent,
  ]
})
export class PageModule { }
