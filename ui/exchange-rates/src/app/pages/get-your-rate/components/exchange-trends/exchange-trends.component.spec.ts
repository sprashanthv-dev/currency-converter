import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeTrendsComponent } from './exchange-trends.component';

describe('ExchangeTrendsComponent', () => {
  let component: ExchangeTrendsComponent;
  let fixture: ComponentFixture<ExchangeTrendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangeTrendsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
