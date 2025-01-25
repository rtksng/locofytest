import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../customer-service.service';
import { CustomValidator } from '../../../custom-validator';
import { CommonModule } from '@angular/common';
import { ValidationMessages } from '../../../validation-messages';

@Component({
  selector: 'app-set-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss'
})
export class SetPasswordComponent {

  clientPasswordForm: FormGroup;
  newPassword: any;
  confirmClientPassword: any;

  constructor(private readonly customerService: CustomerService) {
    this.clientPasswordForm = new FormGroup({
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(14),
        CustomValidator.passwordValidator(),
      ]),
      confirmClientPassword: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  ngOnInit() {
    // this.loginService.showSignInScreen = true
  }

  goToLogin() {
    console.log("Login Page")
  }

  matchPassword() {
    this.newPassword = this.clientPasswordForm.get('newPassword')?.value;
    this.confirmClientPassword = this.clientPasswordForm.get('confirmClientPassword')?.value;

    if (this.confirmClientPassword !== this.newPassword) {
      this.clientPasswordForm.get('confirmClientPassword')?.setValidators([
        Validators.required,
        CustomValidator.passwordMatchValidator(),
      ]);
    } else {
      this.clientPasswordForm.get('confirmClientPassword')?.setValidators([Validators.required]);
    }
    this.clientPasswordForm.get('confirmClientPassword')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.clientPasswordForm.valid) {
      console.log('Form Submitted:', this.clientPasswordForm.value);
      this.customerService.showCustomerForgotPassScreen.emit(false)
      this.customerService.showCustomerOtpVerifyScreen.emit(false)
      this.customerService.showCustomerForgotOtpScreen.emit(false)
      this.customerService.showCustomerLoginScreen.emit(true)
      this.customerService.showCustomerNewPasswordScreen.emit(false)
    } else {
      console.log('Form is invalid');
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.clientPasswordForm.get(controlName);
    if (control?.errors) {
      const firstErrorKey = Object.keys(control.errors)[0];
      return ValidationMessages.getErrorMessage(firstErrorKey, control.errors[firstErrorKey]);
    }
    return '';
  }
}
