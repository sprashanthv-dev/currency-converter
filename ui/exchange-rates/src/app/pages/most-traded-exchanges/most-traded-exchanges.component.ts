import { Component, Input, OnInit } from '@angular/core';
import { MostTradedExchanges } from 'src/app/interfaces/most-traded-exchanges';

@Component({
  selector: 'app-most-traded-exchanges',
  templateUrl: './most-traded-exchanges.component.html',
  styleUrls: ['./most-traded-exchanges.component.css']
})
export class MostTradedExchangesComponent implements OnInit {

  @Input() mostTradedExchanges: MostTradedExchanges[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
