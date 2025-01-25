import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  showCustomerLoginScreen: EventEmitter<boolean> = new EventEmitter<boolean>();
  showCustomerOtpVerifyScreen: EventEmitter<boolean> = new EventEmitter<boolean>();
  showCustomerForgotPassScreen: EventEmitter<boolean> = new EventEmitter<boolean>();
  showCustomerForgotOtpScreen: EventEmitter<boolean> = new EventEmitter<boolean>();
  showCustomerNewPasswordScreen: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }
}
