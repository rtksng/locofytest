import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessagesComponent } from '../../messages/messages.component';
import { CustomerService } from '../customer-service.service';
import { CustomerForgotPasswordComponent } from './customer-forgot-password/customer-forgot-password.component';
import { CustomerOtpVerificationComponent } from './customer-otp-verification/customer-otp-verification.component';
import { CustomerForgotOtpVerificationComponent } from './customer-forgot-otp-verification/customer-forgot-otp-verification.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { CustomValidator } from '../../custom-validator';
import { ValidationMessages } from '../../validation-messages';

@Component({
  selector: 'app-customer-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MessagesComponent, CustomerForgotPasswordComponent, CustomerOtpVerificationComponent, CustomerForgotOtpVerificationComponent, SetPasswordComponent],
  templateUrl: './customer-login.component.html',
  styleUrl: './customer-login.component.scss'
})
export class CustomerLoginComponent {

  clientLoginForm!: FormGroup;
  showCustomerLogin: boolean = true
  showCustomerOtpScreen: boolean = false
  showCustomerForgotPassScreen: boolean = false
  showCustomerForgotOtpScreen: boolean = false
  showCustomerNewPasswordScreen: boolean = false
  constructor(private readonly customerService: CustomerService) {

  }

  ngOnInit() {
    this.clientLoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50), CustomValidator.emailValidator()]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(14), CustomValidator.passwordValidator()])
    })

    this.customerService.showCustomerLoginScreen.subscribe(value => {
      this.showCustomerLogin = value
    })
    this.customerService.showCustomerOtpVerifyScreen.subscribe(value => {
      this.showCustomerOtpScreen = value
    })
    this.customerService.showCustomerForgotPassScreen.subscribe(value => {
      this.showCustomerForgotPassScreen = value
    })
    this.customerService.showCustomerForgotOtpScreen.subscribe(value => {
      this.showCustomerForgotOtpScreen = value
    })
    this.customerService.showCustomerNewPasswordScreen.subscribe(value => {
      this.showCustomerNewPasswordScreen = value
    })
  }


  onSubmit() {
    if (this.clientLoginForm.valid) {
      this.showCustomerLogin = false
      this.showCustomerOtpScreen = true
      this.showCustomerForgotPassScreen = false
      this.showCustomerForgotOtpScreen = false
      this.showCustomerNewPasswordScreen = false
      console.log("Form Submitted")
    } else {
      console.log("Invalid Form!!")
    }
  }

  forgotPasswordClicked() {
    this.showCustomerLogin = false
    this.showCustomerOtpScreen = false
    this.showCustomerForgotPassScreen = true
    this.showCustomerForgotOtpScreen = false
    this.showCustomerNewPasswordScreen = false
  }

  getErrorMessage(controlName: string): string {
    const control = this.clientLoginForm.get(controlName);
    if (control?.errors) {
      const firstErrorKey = Object.keys(control.errors)[0];
      return ValidationMessages.getErrorMessage(firstErrorKey, control.errors[firstErrorKey]);
    }
    return '';
  }
}
