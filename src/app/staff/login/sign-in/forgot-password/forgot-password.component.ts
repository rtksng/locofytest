import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginService } from '../../login-service.service';
import { CustomValidator } from '../../../../custom-validator';
import { ValidationMessages } from '../../../../validation-messages';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  email: string = '';

  forgotPasswordEmailForm: FormGroup;

  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router
  ) {
    this.forgotPasswordEmailForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        CustomValidator.emailValidator(),
      ]),
    });
  }

  ngOnInit() {
    // 
  }

  getErrorMessage(controlName: string): string {
    const control = this.forgotPasswordEmailForm.get(controlName);
    if (control?.errors) {
      const firstErrorKey = Object.keys(control.errors)[0];
      return ValidationMessages.getErrorMessage(firstErrorKey, control.errors[firstErrorKey]);
    }
    return '';
  }

  onSubmit(): void {

    console.warn("Forgot password Entered email id :- ", this.forgotPasswordEmailForm.get('email')?.value);
    this.loginService.showForgotPasswordOtpVerificationScreen.emit(true)
    this.loginService.showSignInScreen.emit(false)
    this.loginService.showOtpVerificationScreen.emit(false)
    this.loginService.showForgotPasswordScreen.emit(false)

  }

  backToLogin() {
    // 
  }

}
