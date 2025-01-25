import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidator } from '../../../custom-validator';
import { interval, switchMap, take } from 'rxjs';
import { CustomerService } from '../../customer-service.service';
import { CommonModule } from '@angular/common';
import { Messages } from '../../../validation-messages';

@Component({
  selector: 'app-customer-otp-verification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-otp-verification.component.html',
  styleUrl: './customer-otp-verification.component.scss'
})
export class CustomerOtpVerificationComponent {
  clientOtpForm!: FormGroup;
  loginInOtpResendTimeLeft: number = 30;
  interval$: any;

  constructor(
    private readonly otpVerificationFormBuilder: FormBuilder,
    private readonly customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.clientOtpForm = this.otpVerificationFormBuilder.group({
      0: ['', [Validators.required, CustomValidator.numericValidator]],
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
        take(this.loginInOtpResendTimeLeft),
        switchMap(() => {
          this.loginInOtpResendTimeLeft--;
          return [];
        })
      )
      .subscribe();
  }

  objectValues(obj: { [key: string]: AbstractControl }) {
    return Object.values(obj);
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
    if (event.key === 'Backspace' && !this.clientOtpForm.get(index.toString())?.value) {
      if (index > 0) {
        const prevInput = document.querySelectorAll('.otp-input')[index - 1] as HTMLInputElement;
        prevInput?.focus();
      }
    }
  }

  resendOtp() {
    if (this.loginInOtpResendTimeLeft === 0) {
      this.loginInOtpResendTimeLeft = 30;
      this.startTimer();
      console.log('Resending OTP...');
    }
  }

  onSubmit() {
    if (this.clientOtpForm.valid) {
      this.customerService.showCustomerOtpVerifyScreen.emit(false)
      this.customerService.showCustomerForgotPassScreen.emit(false)
      this.customerService.showCustomerForgotOtpScreen.emit(false)
      this.customerService.showCustomerNewPasswordScreen.emit(false)
      this.customerService.showCustomerLoginScreen.emit(true)
      const otp = Object.values(this.clientOtpForm.value).join('');
      console.log('OTP submitted:', otp);
      console.log("Dashboard will show!!")
      alert("Dashboard will show!!")

    }
  }

  get otpErrorMessage(): string {
    return Messages.otpRequired;
  }

  isOtpComplete(): boolean {
    return Object.values(this.clientOtpForm.controls).some(control => control.touched && control.invalid);
  }

}
