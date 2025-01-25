import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { interval, switchMap, take } from 'rxjs';
import { LoginService } from '../../login-service.service';
import { CustomValidator } from '../../../../custom-validator';
import { StaffService } from '../../../staff-service.service';
import { Router, RouterModule } from '@angular/router';
import { Messages } from '../../../../validation-messages';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.scss'
})
export class OtpVerificationComponent {
  otpForm!: FormGroup;
  signInOtpResendTimeLeft: number = 30;
  interval$: any;

  constructor(
    private readonly otpVerificationFormBuilder: FormBuilder,
    private readonly loginService: LoginService,
    private readonly staffService: StaffService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.otpForm = this.otpVerificationFormBuilder.group({
      0: ['', [Validators.required, CustomValidator.numericValidator]],
      1: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
      2: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
      3: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
      4: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
      5: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
    });
    this.startTimer();
  }

  get otpErrorMessage(): string {
    return Messages.otpRequired;
  }

  isOtpIncomplete(): boolean {
    return Object.values(this.otpForm.controls).some(control => control.touched && control.invalid);
  }

  startTimer() {
    this.interval$ = interval(1000)
      .pipe(
        take(this.signInOtpResendTimeLeft),
        switchMap(() => {
          this.signInOtpResendTimeLeft--;
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
    if (event.key === 'Backspace' && !this.otpForm.get(index.toString())?.value) {
      if (index > 0) {
        const prevInput = document.querySelectorAll('.otp-input')[index - 1] as HTMLInputElement;
        prevInput?.focus();
      }
    }
  }

  resendOtp() {
    if (this.signInOtpResendTimeLeft === 0) {
      this.signInOtpResendTimeLeft = 30;
      this.startTimer();
      console.log('Resending OTP...');
    }
  }

  onSubmit() {
    if (this.otpForm.valid) {
      const otp = Object.values(this.otpForm.value).join('');
      console.log('OTP submitted:', otp);
      this.router.navigate(['/dashboard'])
    }
  }

  backToLogin() {
    console.warn("Back to login method");
  }

}
