import { Component } from '@angular/core';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { QuizListComponent } from '../../Quiz-Management/quiz-list/quiz-list.component';
import { DataService } from '../../../services/data.service';
import { QuizzesService } from '../../../services/quizzes.service';
import { ErrorsService } from '../../../services/errors.service';
import { AsyncPipe } from '@angular/common';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { ErrorComponent } from '../../shared/error/error.component';

@Component({
  selector: 'app-select-quiz',
  standalone: true,
  imports: [
    BackButtonComponent,
    RouterOutlet,
    QuizListComponent,
    AsyncPipe,
    LoadingSpinnerComponent,
    ErrorComponent,
    RouterLink,
  ],
  templateUrl: './select-quiz.component.html',
})
export class SelectQuizComponent {
  quizzes$ = this.dataService.quizzes$;
  isLoading$ = this.quizzesService.isLoading$;
  isError$ = this.errorsService.isError$;

  constructor(
    private dataService: DataService,
    private quizzesService: QuizzesService,
    private errorsService: ErrorsService,
  ) {}

  retry() {
    this.dataService.refreshQuizzes();
  }
}
