import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  showSignInScreen: EventEmitter<boolean> = new EventEmitter<boolean>();
  showOtpVerificationScreen: EventEmitter<boolean> = new EventEmitter<boolean>();
  showForgotPasswordScreen: EventEmitter<boolean> = new EventEmitter<boolean>();
  showForgotPasswordOtpVerificationScreen: EventEmitter<boolean> = new EventEmitter<boolean>();
  showSetNewPasswordScreen: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }
}
