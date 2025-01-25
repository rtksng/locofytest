
export class ValidationMessages {

  static getErrorMessage(errorKey: string, errorValue: any): string {
    switch (errorKey) {
      case 'required':
        return Messages.required;
      case 'invalidEmail':
        return Messages.email;
      case 'minlength':
        return Messages.minlength.replace('{0}', errorValue.requiredLength);
      case 'invalidPassword':
        return Messages.invalidPassword;
      case 'nonNumeric':
        return Messages.nonNumeric;
      case 'otpRequired':
        return Messages.otpRequired;
      case 'passwordMismatch':
        return Messages.passwordMismatch;
      case 'matching':
        return Messages.matching;
      case 'maxlength':
        return Messages.maxlength.replace('{0}', errorValue.requiredLength);
      default:
        return 'Invalid value';
    }
  }
}

export class Messages {
  static readonly required = 'This field is required';
  static readonly email = 'Please enter a valid email address';
  static readonly minlength = 'This field must have at least {0} characters';
  static readonly invalidPassword = 'Password must contain at least one uppercase letter, one number, and one special character';
  static readonly nonNumeric = 'This field should only contain numeric values';
  static readonly otpRequired = 'OTP must be 6 digits long.';
  static readonly passwordMismatch = 'Passwords do not match';
  static readonly matching = 'Fields must match';
  static readonly maxlength = 'This field must have max {0} characters'
}
