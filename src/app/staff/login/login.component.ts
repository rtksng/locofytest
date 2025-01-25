import { Component } from '@angular/core';
import { SignInComponent } from "./sign-in/sign-in.component";
import { OtpVerificationComponent } from "./sign-in/otp-verification/otp-verification.component";
import { CommonModule } from '@angular/common';
import { LoginService } from './login-service.service';
import { ForgotPasswordComponent } from './sign-in/forgot-password/forgot-password.component';
import { ForgotPasswordOtpVerificationComponent } from "./sign-in/forgot-password/forgot-password-otp-verification/forgot-password-otp-verification.component";
import { SetNewPasswordComponent } from "./sign-in/forgot-password/forgot-password-otp-verification/set-new-password/set-new-password.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, SignInComponent, OtpVerificationComponent, ForgotPasswordComponent, ForgotPasswordOtpVerificationComponent, SetNewPasswordComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  showSignInScreen: boolean = false;
  showOtpVerificationScreen: boolean = false;
  showForgotPasswordScreen: boolean = false;
  showForgotPasswordOtpVerificationScreen: boolean = false;
  showSetNewPasswordScreen: boolean = false;

  constructor(private readonly loginService: LoginService) {
    this.showSignInScreen = true
  }

  ngOnInit() {
    this.loginService.showSignInScreen.subscribe(value => {
      this.showSignInScreen = value
    })
    this.loginService.showOtpVerificationScreen.subscribe(value => {
      this.showOtpVerificationScreen = value
    })
    this.loginService.showForgotPasswordScreen.subscribe(value => {
      this.showForgotPasswordScreen = value
    })
    this.loginService.showForgotPasswordOtpVerificationScreen.subscribe(value => {
      this.showForgotPasswordOtpVerificationScreen = value
    })
    this.loginService.showSetNewPasswordScreen.subscribe(value => {
      this.showSetNewPasswordScreen = value
    })
  }

}
