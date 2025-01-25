import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidator } from '../../custom-validator';
import { MessagesComponent } from '../../messages/messages.component';
import { ValidationMessages } from '../../validation-messages';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MessagesComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signupForm!: FormGroup;
  ngOnInit() {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(48)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(48)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(15), CustomValidator.phoneValidator()]),
      email: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50), CustomValidator.emailValidator()]),
      choosePassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(14), CustomValidator.passwordValidator()]),
      confirmPassword: new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log("Form Submitted")
    } else {
      console.log("Invalid Form!!")
    }
  }

  matchingPassword() {
    if (this.signupForm.get('choosePassword')?.value !== this.signupForm.get('confirmPassword')?.value) {
      this.signupForm.get('confirmPassword')?.setValidators([
        Validators.required,
        CustomValidator.passwordMatchValidator(),
      ]);
    } else {
      this.signupForm.get('confirmPassword')?.setValidators([Validators.required]);
    }
    this.signupForm.get('confirmPassword')?.updateValueAndValidity();
  }

  getErrorMessage(controlName: string): string {
    const control = this.signupForm.get(controlName);
    if (control?.errors) {
      const firstErrorKey = Object.keys(control.errors)[0];
      return ValidationMessages.getErrorMessage(firstErrorKey, control.errors[firstErrorKey]);
    }
    return '';
  }

}
