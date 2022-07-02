import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCurrencyInfoComponent } from './selected-currency-info.component';

describe('SelectedCurrencyInfoComponent', () => {
  let component: SelectedCurrencyInfoComponent;
  let fixture: ComponentFixture<SelectedCurrencyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedCurrencyInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedCurrencyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
