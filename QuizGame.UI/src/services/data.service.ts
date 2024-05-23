import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from '../models/Quiz';
import { QuizzesService } from './quizzes.service';
import { QuizDetails } from '../models/QuizDetails';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private quizzesSubject = new BehaviorSubject<Quiz[] | null>(null);
  quizzes$ = this.quizzesSubject.asObservable();

  private quizSubject = new BehaviorSubject<QuizDetails | null>(null);
  quiz$ = this.quizSubject.asObservable();

  constructor(private quizzesService: QuizzesService) {
    this.refreshQuizzes();
  }

  refreshQuizzes() {
    this.quizzesService
      .getQuizzes()
      .subscribe((quizzes) => this.quizzesSubject.next(quizzes));
  }

  refreshQuiz(id: number) {
    this.quizzesService
      .getQuiz(id)
      .subscribe((quiz) => this.quizSubject.next(quiz));
  }
}
