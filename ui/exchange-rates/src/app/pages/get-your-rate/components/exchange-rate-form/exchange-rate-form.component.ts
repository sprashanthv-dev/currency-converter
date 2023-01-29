import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {EXCHANGE_RATES_CNST} from 'src/app/constants/proj.cnst';
import {CountryInfo} from 'src/app/interfaces/country-info';
import {selectedCurrencyConfig} from 'src/app/interfaces/selected-currency-config';
import {DataService} from 'src/app/services/data.service';
import {UtilService} from 'src/app/services/util.service';

@Component({
  selector: 'app-exchange-rate-form',
  templateUrl: './exchange-rate-form.component.html',
  styleUrls: ['./exchange-rate-form.component.css']
})
export class ExchangeRateFormComponent implements OnInit {

  @Input() countryInfo: CountryInfo[] = [];
  @Output() selectedCurrencyInfo = new EventEmitter<selectedCurrencyConfig>();

  sourceCurrencyAbbr: string | undefined;
  sourceCurrencyName: string | undefined;
  sourceCurrencySymbol: string | undefined | null;

  destCurrencyAbbr: string | undefined;
  destCurrencyName: string | undefined;
  destCurrencySymbol: string | undefined | null;

  constructor(
    private utilSrv: UtilService,
    private dataSrv: DataService) {
  }

  ngOnInit(): void {

  }

  onCurrencySelected(dropdownName: string) {

    //* To identify which dropdown was selected (src / dest currency)
    let { CURRENCY_DROPDOWN_NAMES } = EXCHANGE_RATES_CNST;
    let isSrcDropdown = CURRENCY_DROPDOWN_NAMES.SOURCE_CURRENCY === dropdownName;
    let currencySymbol = null;

    let predicate = isSrcDropdown ? this.sourceCurrencyAbbr : this.destCurrencyAbbr;
    let selectedCountryInfo = this.countryInfo.filter(item => item.id === predicate);

    if (selectedCountryInfo.length > 0) {
      let {currencyName} = selectedCountryInfo[0];

      this.sourceCurrencyName = isSrcDropdown ? currencyName : this.sourceCurrencyName;
      this.destCurrencyName = !isSrcDropdown ? currencyName : this.destCurrencyName;
    }

    let selectedCurrencyConfig: selectedCurrencyConfig = {
      srcCurrency: this.sourceCurrencyAbbr,
      destCurrency: this.destCurrencyAbbr,
      srcCurrencyFullName: this.sourceCurrencyName,
      destCurrencyFullName: this.destCurrencyName
    }

    //* Handle currency symbol change based on selection
    let currencyId = isSrcDropdown ? this.sourceCurrencyAbbr : this.destCurrencyAbbr;

    if (!this.utilSrv.isNullOrUndefined(currencyId)) {
      currencySymbol = this.dataSrv.handleCurrencySymbolsOnSelection(currencyId, this.countryInfo);
      this.setCurrencySymbol(isSrcDropdown, currencySymbol);
    } else {
      this.setCurrencySymbol(isSrcDropdown, null);
    }

    this.selectedCurrencyInfo.emit(selectedCurrencyConfig);
  }

  setCurrencySymbol(isSrcDropdown: boolean, value: string | null = null) {

    if (isSrcDropdown) {
      this.sourceCurrencySymbol = value;
    } else {
      this.destCurrencySymbol = value;
    }
  }
}
