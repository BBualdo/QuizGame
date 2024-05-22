import { Component } from '@angular/core';
import { QuizCreatorService } from '../../../../services/quiz-creator.service';
import { QuizReqDTO } from '../../../../models/QuizReqDTO';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { AnswerReqDTO } from '../../../../models/AnswerReqDTO';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'stepper',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
})
export class StepperComponent {
  currentStep: number = 1;
  quiz: QuizReqDTO | null = null;

  qAndAFormGroup = new FormGroup({
    question: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(200),
    ]),
    answer1: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    answer2: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    answer3: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    answer4: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
  });

  constructor(
    private quizCreatorService: QuizCreatorService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.quizCreatorService.quiz$.subscribe((quiz) => (this.quiz = quiz));
  }

  setCorrect(answer: AnswerReqDTO) {
    answer.isCorrect = true;
  }

  next() {
    this.qAndAFormGroup.markAllAsTouched();
    if (this.currentStep === this.quiz?.questions.length) {
      return;
    }
    if (this.qAndAFormGroup.valid) {
      this.currentStep++;
    }
  }

  previous() {
    if (this.currentStep === 1) {
      this.quizCreatorService.clearQuiz();
      this.router.navigate(['quiz-management/create']);
    }
    this.currentStep--;
  }
}
