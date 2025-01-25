import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOtpVerfificationComponent } from './customer-otp-verification.component';

describe('CustomerOtpVerfificationComponent', () => {
  let component: CustomerOtpVerfificationComponent;
  let fixture: ComponentFixture<CustomerOtpVerfificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerOtpVerfificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerOtpVerfificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
