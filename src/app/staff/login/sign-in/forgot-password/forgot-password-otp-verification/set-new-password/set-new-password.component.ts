import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../../login-service.service';
import { CustomValidator } from '../../../../../../custom-validator';
import { CommonModule } from '@angular/common';
import { ValidationMessages } from '../../../../../../validation-messages';

@Component({
  selector: 'app-set-new-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './set-new-password.component.html',
  styleUrl: './set-new-password.component.scss'
})
export class SetNewPasswordComponent {

  newPasswordForm: FormGroup;
  newPassword: any;
  confirmNewPassword: any;
  passwordUpdateSuccessfull: boolean = false;

  constructor(private readonly loginService: LoginService) {
    this.newPasswordForm = new FormGroup({
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        CustomValidator.passwordValidator(),
      ]),
      confirmNewPassword: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  ngOnInit() {
    // this.loginService.showSignInScreen = true
  }

  getErrorMessage(controlName: string): string {
    const control = this.newPasswordForm.get(controlName);
    if (control?.errors) {
      const firstErrorKey = Object.keys(control.errors)[0];
      return ValidationMessages.getErrorMessage(firstErrorKey, control.errors[firstErrorKey]);
    }
    return '';
  }

  backToLogin() {
    //
  }

  matchPassword() {
    this.newPassword = this.newPasswordForm.get('newPassword')?.value;
    this.confirmNewPassword = this.newPasswordForm.get('confirmNewPassword')?.value;

    if (this.confirmNewPassword !== this.newPassword) {
      this.newPasswordForm.get('confirmNewPassword')?.setValidators([
        Validators.required,
        CustomValidator.passwordMatchValidator(),
      ]);
    } else {
      this.newPasswordForm.get('confirmNewPassword')?.setValidators([Validators.required]);
    }
    this.newPasswordForm.get('confirmNewPassword')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.newPasswordForm.valid) {
      console.log('Form Submitted:', this.newPasswordForm.get('newPassword')?.value);
      this.passwordUpdateSuccessfull = true
      setTimeout(() => {
        this.passwordUpdateSuccessfull = false;
      }, 5000);
      this.clearFields()
    } else {
      console.log('Form is invalid');
    }
  }

  clearFields() {
    this.newPasswordForm.get('newPassword')?.reset();
    this.newPasswordForm.get('confirmNewPassword')?.reset();
  }

}
