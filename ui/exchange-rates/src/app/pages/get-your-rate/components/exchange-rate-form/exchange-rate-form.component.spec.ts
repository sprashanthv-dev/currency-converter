import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeRateFormComponent } from './exchange-rate-form.component';

describe('ExchangeRateFormComponent', () => {
  let component: ExchangeRateFormComponent;
  let fixture: ComponentFixture<ExchangeRateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangeRateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeRateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
