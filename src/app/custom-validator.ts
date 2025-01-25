import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidator {

  // Email Validator
  static emailValidator(): ValidatorFn {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && !emailPattern.test(control.value)) {
        return { invalidEmail: true };
      }
      return null;
    };
  }

  // Password Validator
  static passwordValidator(): ValidatorFn {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && !passwordPattern.test(control.value)) {
        return { invalidPassword: true };
      }
      return null;
    };
  }

  // Numeric Validator
  static numericValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && !/^\d$/.test(value)) {
      return { nonNumeric: true };
    }
    return null;
  }

  // Password Match Validator
  static passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control?.value !== control?.parent?.get('newPassword')?.value) {
        return { passwordMismatch: true };
      }
      return null;
    };
  }

  // Validate any min length
  static minLength(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value && control.value.length >= min ? null : { minlength: { requiredLength: min, actualLength: control.value.length } };
    };
  }

  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }

    static phoneValidator(): ValidatorFn {
        const phonePattern = /^\+(\d{1,3})\d{10,15}$/;///^\+(\d{1,3})\d{10}$/
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value && !phonePattern.test(control.value)) {
                return { invalidPhone: true };
            }
            return null;
        };
    }

    static phoneMask() {
        const phoneMask = /^\(\d{3}\) \d{3}-\d{4}$/
        return phoneMask;
    }


}
