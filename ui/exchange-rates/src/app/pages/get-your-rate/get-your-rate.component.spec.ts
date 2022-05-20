import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetYourRateComponent } from './get-your-rate.component';

describe('GetYourRateComponent', () => {
  let component: GetYourRateComponent;
  let fixture: ComponentFixture<GetYourRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetYourRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetYourRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
