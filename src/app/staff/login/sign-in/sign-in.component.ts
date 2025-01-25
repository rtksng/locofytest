import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../login-service.service';
import { CustomValidator } from '../../../custom-validator';
import { ValidationMessages } from '../../../validation-messages';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  signInForm: FormGroup;

  constructor(
    private readonly loginService: LoginService
  ) {
    this.signInForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        CustomValidator.emailValidator(),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        CustomValidator.passwordValidator(),
      ]),
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.signInForm.get(controlName);
    if (control?.errors) {
      const firstErrorKey = Object.keys(control.errors)[0];
      return ValidationMessages.getErrorMessage(firstErrorKey, control.errors[firstErrorKey]);
    }
    return '';
  }

  ngOnInit() {
    // this.loginService.showSignInScreen = true
  }

  onSubmit() {
    this.loginService.showSignInScreen.emit(false)
    this.loginService.showOtpVerificationScreen.emit(true)
    if (this.signInForm.valid) {
      console.log('Form Submitted:', this.signInForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  forgotPasswordClicked() {
    this.loginService.showSignInScreen.emit(false)
    this.loginService.showOtpVerificationScreen.emit(false)
    this.loginService.showForgotPasswordScreen.emit(true)
  }

}
