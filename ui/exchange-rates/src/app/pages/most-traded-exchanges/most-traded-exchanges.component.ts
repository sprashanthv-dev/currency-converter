import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MostTradedExchanges } from 'src/app/interfaces/most-traded-exchanges';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-most-traded-exchanges',
  templateUrl: './most-traded-exchanges.component.html',
  styleUrls: ['./most-traded-exchanges.component.css']
})
export class MostTradedExchangesComponent implements OnChanges {

  @Input() mostTradedExchanges: MostTradedExchanges[] = [];
  @Output() onCountryNameSearched: EventEmitter<string> = new EventEmitter<string>();

  areTableRecordsEmpty: boolean = false;

  constructor(private utilSrv: UtilService) { }

  ngOnChanges(): void {
    this.areTableRecordsEmpty = this.utilSrv.isArrayEmpty(this.mostTradedExchanges) ? true : false;
  }

  private _countryFilter: string = '';

  get countryFilter(): string {
    return this._countryFilter;
  }

  set countryFilter(countryName: string) {
    this._countryFilter = countryName;
    this.onCountryNameSearched.emit(this._countryFilter);
  }

}
