import { Component } from '@angular/core';
import { BackButtonComponent } from '../shared/back-button/back-button.component';
import { Observable } from 'rxjs';
import { QuizzesService } from '../../services/quizzes.service';
import { Quiz } from '../../models/Quiz';
import { AsyncPipe } from '@angular/common';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { ErrorsService } from '../../services/errors.service';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-quiz-manager',
  standalone: true,
  imports: [
    BackButtonComponent,
    AsyncPipe,
    LoadingSpinnerComponent,
    ErrorComponent,
  ],
  templateUrl: './quiz-manager.component.html',
  styleUrl: './quiz-manager.component.css',
})
export class QuizManagerComponent {
  quizzes$: Observable<Quiz[]> = this.quizzesService.getQuizzes();
  isLoading$: Observable<boolean> = this.quizzesService.isLoading$;
  isError$: Observable<boolean> = this.errorsService.isError$;

  constructor(
    private quizzesService: QuizzesService,
    private errorsService: ErrorsService,
  ) {}
}
