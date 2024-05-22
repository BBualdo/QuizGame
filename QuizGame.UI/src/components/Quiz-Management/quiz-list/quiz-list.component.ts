import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from '../../../models/Quiz';
import { QuizzesService } from '../../../services/quizzes.service';
import { ErrorsService } from '../../../services/errors.service';
import { AsyncPipe } from '@angular/common';
import { ErrorComponent } from '../../shared/error/error.component';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
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

  constructor(
    private quizzesService: QuizzesService,
    private errorsService: ErrorsService,
  ) {}

  retry(): void {
    this.quizzesService.getQuizzes().subscribe();
  }
}
