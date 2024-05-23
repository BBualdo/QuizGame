import { Component } from '@angular/core';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { QuizListComponent } from '../../Quiz-Management/quiz-list/quiz-list.component';
import { DataService } from '../../../services/data.service';
import { QuizzesService } from '../../../services/quizzes.service';
import { ErrorsService } from '../../../services/errors.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { ErrorComponent } from '../../shared/error/error.component';
import { Quiz } from '../../../models/Quiz';
import { GameService } from '../../../services/game.service';

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
    NgClass,
  ],
  templateUrl: './select-quiz.component.html',
})
export class SelectQuizComponent {
  quizzes$ = this.dataService.quizzes$;
  isLoading$ = this.quizzesService.isLoading$;
  isError$ = this.errorsService.isError$;
  selectedQuizId: number | null = null;

  constructor(
    private dataService: DataService,
    private quizzesService: QuizzesService,
    private errorsService: ErrorsService,
    private router: Router,
    private gameService: GameService,
  ) {}

  ngOnInit() {
    this.gameService.newGame$.subscribe(
      (game) => (this.selectedQuizId = game.quizId),
    );
  }

  setSelectedQuiz(quiz: Quiz) {
    this.selectedQuizId = quiz.quizId;
    this.gameService.updateQuiz(this.selectedQuizId);
  }

  back() {
    this.router.navigate(['play']);
  }

  next() {
    if (this.selectedQuizId) {
      this.router.navigate(['play/difficulty'], { skipLocationChange: true });
    }
  }

  retry() {
    this.dataService.refreshQuizzes();
  }
}
