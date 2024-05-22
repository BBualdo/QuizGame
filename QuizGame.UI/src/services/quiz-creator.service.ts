import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { QuizReqDTO } from '../models/QuizReqDTO';

@Injectable({
  providedIn: 'root',
})
export class QuizCreatorService {
  private quizSubject: Subject<QuizReqDTO> = new BehaviorSubject<QuizReqDTO>({
    name: '',
    questions: [],
  });
  quiz$ = this.quizSubject.asObservable();

  updateQuiz(quiz: QuizReqDTO) {
    this.quizSubject.next(quiz);
  }
}
