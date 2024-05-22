import { Component, Input } from '@angular/core';

@Component({
  selector: 'stepper',
  standalone: true,
  imports: [],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
})
export class StepperComponent {
  @Input() stepsAmount: number = 5;
  @Input() quizName: string = '';
  currentStep: number = 1;

  next() {
    if (this.currentStep === this.stepsAmount) {
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
