import { Component } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { QuizDetails } from '../../../models/QuizDetails';
import { GameService } from '../../../services/game.service';
import { QuizzesService } from '../../../services/quizzes.service';
import { GameReqDTO } from '../../../models/GameReqDTO';
import { Observable } from 'rxjs';
import { ErrorsService } from '../../../services/errors.service';
import { AsyncPipe } from '@angular/common';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { ErrorComponent } from '../../shared/error/error.component';

@Component({
  selector: 'app-game-session',
  standalone: true,
  imports: [TimerComponent, AsyncPipe, LoadingSpinnerComponent, ErrorComponent],
  templateUrl: './game-session.component.html',
})
export class GameSessionComponent {
  game: GameReqDTO | null = null;
  quiz$: Observable<QuizDetails> | null = null;
  isLoading$: Observable<boolean> = this.quizzesService.isLoading$;
  isError$: Observable<boolean> = this.errorsService.isError$;

  constructor(
    private gameService: GameService,
    private quizzesService: QuizzesService,
    private errorsService: ErrorsService,
  ) {}

  ngOnInit(): void {
    this.gameService.newGame$.subscribe((game) => (this.game = game));
    if (this.game) {
      this.quiz$ = this.quizzesService.getQuiz(this.game.quizId!);
    }
  }

  retry() {
    if (this.game) {
      this.quizzesService.getQuiz(this.game.quizId!).subscribe();
    }
  }
}
