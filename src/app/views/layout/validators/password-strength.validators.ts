import { AbstractControl, ValidationErrors } from "@angular/forms";

export const PasswordStrengthValidator = function (control: AbstractControl): ValidationErrors | null {

  const value: string = control.value || '';

  if (!value) {
    return null
  }

  const upperCaseCharacters = /[A-Z]+/g
  if (upperCaseCharacters.test(value) === false) {
    return { passwordStrength: `Password has to contain upper case characters` };
  }

  const lowerCaseCharacters = /[a-z]+/g
  if (lowerCaseCharacters.test(value) === false) {
    return { passwordStrength: `Password has to contain lower case characters` };
  }


  const numberCharacters = /[0-9]+/g
  if (numberCharacters.test(value) === false) {
    return { passwordStrength: `Password has to contain number characters` };
  }

  const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
  if (specialCharacters.test(value) === false) {
    return { passwordStrength: `Password has to contain special characters` };
  }
  return null;
}