import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerForgotOtpVerificationComponent } from './customer-forgot-otp-verification.component';

describe('CustomerForgotOtpVerificationComponent', () => {
  let component: CustomerForgotOtpVerificationComponent;
  let fixture: ComponentFixture<CustomerForgotOtpVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerForgotOtpVerificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerForgotOtpVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
