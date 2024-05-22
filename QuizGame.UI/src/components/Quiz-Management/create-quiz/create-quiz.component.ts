import { Component } from '@angular/core';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { NgClass } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [
    BackButtonComponent,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    RouterLink,
  ],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.css',
})
export class CreateQuizComponent {
  quizInfoFormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    questionsAmount: new FormControl(5, [
      Validators.required,
      Validators.min(5),
      Validators.max(15),
    ]),
  });

  proceed() {
    console.log(this.quizInfoFormGroup.value);
    this.quizInfoFormGroup.markAllAsTouched();
    if (this.quizInfoFormGroup.valid) {
      console.log('Proceeding...');
    }
  }
}
