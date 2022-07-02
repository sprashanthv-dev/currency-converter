import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-selected-currency-info',
  templateUrl: './selected-currency-info.component.html',
  styleUrls: ['./selected-currency-info.component.css']
})
export class SelectedCurrencyInfoComponent implements OnInit {

  @Input() displayInfo: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
