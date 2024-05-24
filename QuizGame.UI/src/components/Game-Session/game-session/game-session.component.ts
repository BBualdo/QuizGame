import { Component } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { QuizDetails } from '../../../models/QuizDetails';
import { NewGameService } from '../../../services/new-game.service';
import { QuizzesService } from '../../../services/quizzes.service';
import { GameReqDTO } from '../../../models/GameReqDTO';
import { map, Observable } from 'rxjs';
import { ErrorsService } from '../../../services/errors.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { ErrorComponent } from '../../shared/error/error.component';
import { Router } from '@angular/router';
import { Question } from '../../../models/Question';
import { Answer } from '../../../models/Answer';
import { GamesService } from '../../../services/games.service';

@Component({
  selector: 'app-game-session',
  standalone: true,
  imports: [
    TimerComponent,
    AsyncPipe,
    LoadingSpinnerComponent,
    ErrorComponent,
    NgClass,
  ],
  templateUrl: './game-session.component.html',
})
export class GameSessionComponent {
  game: GameReqDTO | null = null;
  quiz$: Observable<QuizDetails> | null = null;
  isLoading$: Observable<boolean> = this.quizzesService.isLoading$;
  isError$: Observable<boolean> = this.errorsService.isError$;

  currentQuestion = 1;
  answersChecked = false;
  correctAnswersCount = 0;
  selectedAnswer: Answer | null = null;

  constructor(
    private newGameService: NewGameService,
    private quizzesService: QuizzesService,
    private errorsService: ErrorsService,
    private router: Router,
    private gamesService: GamesService,
  ) {}

  ngOnInit(): void {
    this.newGameService.newGame$.subscribe((game) => (this.game = game));
    this.validateGameData();
    if (this.game) {
      this.quiz$ = this.quizzesService.getQuiz(this.game.quizId!).pipe(
        map((quiz: QuizDetails) => {
          quiz.questions = this.shuffleQuestionsAndAnswers(quiz.questions);
          return quiz;
        }),
      );
    }
  }

  retry() {
    if (this.game) {
      this.quizzesService.getQuiz(this.game.quizId!).subscribe();
    }
  }

  checkAnswer(answer: Answer) {
    if (this.selectedAnswer !== null) return;
    this.selectedAnswer = answer;
    this.answersChecked = true;
    if (this.selectedAnswer.isCorrect) {
      this.correctAnswersCount++;
    }
  }

  next(quizLength: number) {
    if (this.currentQuestion < quizLength) {
      this.currentQuestion++;
      this.answersChecked = false;
      this.selectedAnswer = null;
    }
  }

  showResults() {
    this.newGameService.setScore(
      this.calculateScorePercentage(this.correctAnswersCount),
    );
    this.newGameService.setDate();
    this.gamesService.addGame(this.game!).subscribe();
    this.router.navigate(['play/results']);
  }

  private calculateScorePercentage(score: number): number {
    return Math.round((score / this.currentQuestion) * 100);
  }

  private shuffleQuestionsAndAnswers(questionsArr: Question[]): Question[] {
    const questions = this.shuffle(questionsArr);
    questions.forEach((question) => {
      this.shuffle(question.answers);
    });
    return questions;
  }

  private shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  private validateGameData() {
    if (!this.game?.quizId) {
      this.router.navigate(['play']);
    }
  }
}
