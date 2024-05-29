import { Component } from '@angular/core';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { matchPasswordValidator } from '../../../validators/match-password.validator';
import { NgClass } from '@angular/common';
import { emailValidator } from '../../../validators/email.validator';
import { passwordValidator } from '../../../validators/password.validator';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [BackButtonComponent, RouterLink, ReactiveFormsModule, NgClass],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  registerForm: FormGroup = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(40),
      ]),
      email: new FormControl('', [Validators.required, emailValidator]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        passwordValidator,
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      validators: matchPasswordValidator,
    },
  );

  submit() {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    }

    console.log(this.registerForm.errors);
  }
}
