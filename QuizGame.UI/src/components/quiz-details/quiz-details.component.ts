import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ErrorComponent } from '../shared/error/error.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { BackButtonComponent } from '../shared/back-button/back-button.component';

@Component({
  selector: 'app-quiz-details',
  standalone: true,
  imports: [
    AsyncPipe,
    ErrorComponent,
    LoadingSpinnerComponent,
    BackButtonComponent,
  ],
  templateUrl: './quiz-details.component.html',
  styleUrl: './quiz-details.component.css',
})
export class QuizDetailsComponent {}
