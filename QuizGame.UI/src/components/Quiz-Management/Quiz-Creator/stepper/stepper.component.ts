import { Component } from '@angular/core';
import { QuizCreatorService } from '../../../../services/quiz-creator.service';
import { QuizReqDTO } from '../../../../models/QuizReqDTO';

@Component({
  selector: 'stepper',
  standalone: true,
  imports: [],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
})
export class StepperComponent {
  currentStep: number = 1;
  quiz: QuizReqDTO | null = null;

  constructor(private quizCreatorService: QuizCreatorService) {}

  ngOnInit(): void {
    this.quizCreatorService.quiz$.subscribe((quiz) => (this.quiz = quiz));
  }

  next() {
    if (this.currentStep === this.quiz?.questions.length) {
      return;
    }
    this.currentStep++;
  }

  previous() {
    if (this.currentStep === 1) {
      return;
    }
    this.currentStep--;
  }
}
