import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EXCHANGE_RATES_CNST } from 'src/app/constants/proj.cnst';
import { CountryInfo } from 'src/app/interfaces/country-info';
import { selectedCurrencyConfig } from 'src/app/interfaces/selected-currency-config';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-exchange-rate-form',
  templateUrl: './exchange-rate-form.component.html',
  styleUrls: ['./exchange-rate-form.component.css']
})
export class ExchangeRateFormComponent implements OnInit {

  @Input() countryInfo: CountryInfo[] = [];
  @Output() selectedCurrencyInfo = new EventEmitter<selectedCurrencyConfig>();

  sourceCurrency: string | undefined;
  sourceCurrencySymbol : string | undefined;
  sourceCurrencySelected : boolean = false;

  destCurrency: string | undefined;
  destCurrencySymbol : string | undefined;
  destCurrencySelected : boolean = false;

  constructor(private utilSrv : UtilService) { }

  ngOnInit(): void {

  }

  onCurrencySelected(dropdownName: string) {

    //* To identify which dropdown was selected (src / dest currency)
    let { CURRENCY_DROPDOWN_NAMES } = EXCHANGE_RATES_CNST;

    let selectedCurrencyConfig : selectedCurrencyConfig = {
      srcCurrency : this.sourceCurrency,
      destCurrency : this.destCurrency
    }

    this.selectedCurrencyInfo.emit(selectedCurrencyConfig);
  }
}
