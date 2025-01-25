import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../customer-service.service';
import { interval, switchMap, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Messages } from '../../../validation-messages';

@Component({
  selector: 'app-customer-forgot-otp-verification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-forgot-otp-verification.component.html',
  styleUrl: './customer-forgot-otp-verification.component.scss'
})
export class CustomerForgotOtpVerificationComponent {
  clientForgotOtpForm!: FormGroup;
  loginOtpResendTimeLeft: number = 30;
  interval$: any;

  constructor(
    private readonly otpVerificationFormBuilder: FormBuilder,
    private readonly customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.clientForgotOtpForm = this.otpVerificationFormBuilder.group({
      0: ['', [Validators.required, Validators.pattern('[0-9]')]],
      1: ['', [Validators.required, Validators.pattern('[0-9]')]],
      2: ['', [Validators.required, Validators.pattern('[0-9]')]],
      3: ['', [Validators.required, Validators.pattern('[0-9]')]],
      4: ['', [Validators.required, Validators.pattern('[0-9]')]],
      5: ['', [Validators.required, Validators.pattern('[0-9]')]],
    });
    this.startTimer();
  }

  startTimer() {
    this.interval$ = interval(1000)
      .pipe(
        take(this.loginOtpResendTimeLeft),
        switchMap(() => {
          this.loginOtpResendTimeLeft--;
          return [];
        })
      )
      .subscribe();
  }

  onOtpInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value && !/^\d$/.test(value)) {
      input.value = '';
      return;
    }

    if (value.length === 1 && index < 5) {
      const nextInput = document.querySelectorAll('.otp-input')[index + 1] as HTMLInputElement;
      nextInput?.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace' && !this.clientForgotOtpForm.get(index.toString())?.value) {
      if (index > 0) {
        const prevInput = document.querySelectorAll('.otp-input')[index - 1] as HTMLInputElement;
        prevInput?.focus();
      }
    }
  }

  objectValues(obj: { [key: string]: AbstractControl }) {
    return Object.values(obj);
  }

  resendOtp() {
    if (this.loginOtpResendTimeLeft === 0) {
      this.loginOtpResendTimeLeft = 30;
      this.startTimer();
      console.log('Resending OTP...');
    }
  }

  onSubmit() {
    if (this.clientForgotOtpForm.valid) {
      // This will show New Password screen
      alert("This will show New Password Screen!!")
      this.customerService.showCustomerForgotPassScreen.emit(false)
      this.customerService.showCustomerOtpVerifyScreen.emit(false)
      this.customerService.showCustomerForgotOtpScreen.emit(false)
      this.customerService.showCustomerLoginScreen.emit(false)
      this.customerService.showCustomerNewPasswordScreen.emit(true)
    } else {
      console.log("Errors!!!")
    }
  }

  goToLogin() {
    console.warn("Back to login method");
  }

  get otpErrorMessage(): string {
    return Messages.otpRequired;
  }

  isOtpComplete(): boolean {
    return Object.values(this.clientForgotOtpForm.controls).some(control => control.touched && control.invalid);
  }

}
