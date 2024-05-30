import { Component } from '@angular/core';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { passwordValidator } from '../../../validators/password.validator';
import { UserLogin } from '../../../models/DTOs/UserLogin';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [BackButtonComponent, RouterLink, ReactiveFormsModule, NgClass],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(40),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      passwordValidator,
    ]),
  });

  submit() {
    this.loginForm.markAllAsTouched();
    const formValues = this.loginForm.value;

    if (this.loginForm.valid) {
      const user: UserLogin = {
        username: formValues.username,
        password: formValues.password,
      };

      console.log(user);
    }
  }
}
