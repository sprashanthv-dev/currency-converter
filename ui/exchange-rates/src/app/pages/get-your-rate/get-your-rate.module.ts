import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeRateFormComponent } from './components/exchange-rate-form/exchange-rate-form.component';
import { ExchangeTrendsComponent } from './components/exchange-trends/exchange-trends.component';
import { SelectedCurrencyInfoComponent } from './components/selected-currency-info/selected-currency-info.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ExchangeRateFormComponent,
    ExchangeTrendsComponent,
    SelectedCurrencyInfoComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule
  ],
  exports: [
    ExchangeRateFormComponent,
    ExchangeTrendsComponent,
    SelectedCurrencyInfoComponent
  ]
})
export class GetYourRateModule { }
