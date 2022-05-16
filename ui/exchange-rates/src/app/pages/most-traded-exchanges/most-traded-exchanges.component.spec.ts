import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostTradedExchangesComponent } from './most-traded-exchanges.component';

describe('MostTradedExchangesComponent', () => {
  let component: MostTradedExchangesComponent;
  let fixture: ComponentFixture<MostTradedExchangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostTradedExchangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostTradedExchangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
