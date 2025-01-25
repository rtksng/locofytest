import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroupName } from '@angular/forms';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {
  @Input() control: AbstractControl | null = null;

  get isInvalid() {
    return this.control?.invalid && this.control?.touched;
  }

  get requiredError() {
    return this.control?.hasError('required');
  }

  get minLengthError() {
    return this.control?.hasError('minlength');
  }

  get emailError() {
    return this.control?.hasError('email');
  }

  get invalidEmail() {
    return this.control?.hasError('invalidEmail');
  }

  get invalidPassword() {
    return this.control?.hasError('invalidPassword');
  }

  get phoneValidator() {
    return this.control?.hasError('invalidPhone');
  }


}
