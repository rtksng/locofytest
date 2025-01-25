import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../customer-service.service';
import { CustomValidator } from '../../../custom-validator';
import { ValidationMessages } from '../../../validation-messages';

@Component({
  selector: 'app-customer-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './customer-forgot-password.component.html',
  styleUrl: './customer-forgot-password.component.scss'
})
export class CustomerForgotPasswordComponent {
  email: string = '';
  forgotPassEmailForm!: FormGroup;
  constructor(private readonly router: Router,
    private readonly customerService: CustomerService
  ) {

  }

  ngOnInit() {
    this.forgotPassEmailForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        CustomValidator.emailValidator(),
      ]),
    });
  }

  onSubmit(): void {
    if (this.forgotPassEmailForm.valid) {
      console.log('Password reset request for email:', this.email);
      this.customerService.showCustomerForgotPassScreen.emit(false)
      this.customerService.showCustomerOtpVerifyScreen.emit(false)
      this.customerService.showCustomerNewPasswordScreen.emit(false)
      this.customerService.showCustomerForgotOtpScreen.emit(true)
      this.customerService.showCustomerLoginScreen.emit(false)
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.forgotPassEmailForm.get(controlName);
    if (control?.errors) {
      const firstErrorKey = Object.keys(control.errors)[0];
      return ValidationMessages.getErrorMessage(firstErrorKey, control.errors[firstErrorKey]);
    }
    return '';
  }

}
