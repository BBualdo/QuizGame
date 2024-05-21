import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { Quiz } from '../../models/Quiz';
import { QuizzesService } from '../../services/quizzes.service';
import { ErrorsService } from '../../services/errors.service';
import { AsyncPipe } from '@angular/common';
import { ErrorComponent } from '../shared/error/error.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [AsyncPipe, ErrorComponent, LoadingSpinnerComponent, RouterLink],
  templateUrl: './quiz-list.component.html',
  styleUrl: './quiz-list.component.css',
})
export class QuizListComponent {
  quizzes$: Observable<Quiz[]> = this.quizzesService.getQuizzes();
  isLoading$: Observable<boolean> = this.quizzesService.isLoading$;
  isError$: Observable<boolean> = this.errorsService.isError$;
  isButtonDisabled$: Observable<boolean> = combineLatest<[boolean, boolean]>([
    this.isLoading$,
    this.isError$,
  ]).pipe(map(([isLoading, isError]) => isLoading || isError));

  constructor(
    private quizzesService: QuizzesService,
    private errorsService: ErrorsService,
  ) {}
}
