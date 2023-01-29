import {Component, OnInit} from '@angular/core';
import {CountryInfo} from 'src/app/interfaces/country-info';
import {selectedCurrencyConfig} from 'src/app/interfaces/selected-currency-config';
import {countriesList} from 'src/app/mock-data/countries';
import {ApiResponseFormatterService} from 'src/app/services/api-response-formatter.service';
import {DataService} from 'src/app/services/data.service';
import {UtilService} from 'src/app/services/util.service';

@Component({
  selector: 'app-get-your-rate',
  templateUrl: './get-your-rate.component.html',
  styleUrls: ['./get-your-rate.component.css']
})
export class GetYourRateComponent implements OnInit {

  countryInfo: CountryInfo[] = [];
  countryInfoFiltered: CountryInfo[] = [];

  prevSrcCurrency: string | null | undefined = null;
  prevDestCurrency: string | null | undefined = null;

  srcCurrencyName : string | null | undefined = null;
  destCurrencyName : string | null | undefined = null;

  constructor(
    private apiResponseFormatterSrv: ApiResponseFormatterService,
    private utilSrv: UtilService,
    private dataSrv: DataService) {
  }

  ngOnInit(): void {
    this.countryInfo = this.apiResponseFormatterSrv.formatCountriesListResponse(countriesList);
    this.countryInfoFiltered = [...this.countryInfo];
  }

  handleCurrencySelection(currencyInfo: selectedCurrencyConfig) {

    //* Display those currencies only when it is not present both in src and dest
    let {
      srcCurrency,
      destCurrency,
      srcCurrencyFullName,
      destCurrencyFullName
    } = currencyInfo;

    let isSrcPresent = !this.utilSrv.isNullOrUndefined(srcCurrency);
    let isDestPresent = !this.utilSrv.isNullOrUndefined(destCurrency);
    let areBothSrcAndDestPresent = isSrcPresent && isDestPresent;

    this.srcCurrencyName = this.utilSrv.capitalizeFirstLetter(srcCurrencyFullName);
    this.destCurrencyName = this.utilSrv.capitalizeFirstLetter(destCurrencyFullName);

    //* If a prev currency selection is overridden by a new selection
    //* insert the prev currency selection in original data before
    //* filtering the data based on current currency selection
    if (!this.utilSrv.isNullOrUndefined(this.prevSrcCurrency)) {

      if (this.prevSrcCurrency !== srcCurrency && this.prevDestCurrency !== srcCurrency) {

        let currencyInfo: CountryInfo = this.countryInfo
          .filter((item: CountryInfo) => item.id === this.prevSrcCurrency)[0];

        this.countryInfoFiltered.push(currencyInfo);
      }
    }

    if (!this.utilSrv.isNullOrUndefined(this.prevDestCurrency)) {

      if (this.prevDestCurrency !== destCurrency && this.prevDestCurrency !== destCurrency) {

        let currencyInfo: CountryInfo = this.countryInfo
          .filter((item: CountryInfo) => item.id === this.prevDestCurrency)[0];

        this.countryInfoFiltered.push(currencyInfo);
      }
    }

    if (areBothSrcAndDestPresent) {
      this.countryInfoFiltered = this.countryInfoFiltered.filter
      ((item: CountryInfo) => item.id !== srcCurrency && item.id !== destCurrency);
    } else if (isSrcPresent) {
      this.countryInfoFiltered = this.countryInfoFiltered.filter
      ((item: CountryInfo) => item.id !== srcCurrency);
    } else if (isDestPresent) {
      this.countryInfoFiltered = this.countryInfoFiltered.filter
      ((item: CountryInfo) => item.id !== destCurrency);
    } else {
      this.countryInfoFiltered = this.countryInfo;
    }

    this.prevSrcCurrency = this.utilSrv.isStringUndefined(srcCurrency) ? null : srcCurrency;
    this.prevDestCurrency = this.utilSrv.isStringUndefined(destCurrency) ? null : destCurrency;
  }
}
