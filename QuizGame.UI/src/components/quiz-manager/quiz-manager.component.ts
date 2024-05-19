import { Component } from '@angular/core';
import { BackButtonComponent } from '../shared/back-button/back-button.component';
import { Observable } from 'rxjs';
import { QuizzesService } from '../../services/quizzes.service';
import { Quiz } from '../../models/Quiz';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-quiz-manager',
  standalone: true,
  imports: [BackButtonComponent, AsyncPipe],
  templateUrl: './quiz-manager.component.html',
  styleUrl: './quiz-manager.component.css',
})
export class QuizManagerComponent {
  quizzes$: Observable<Quiz[]>;

  constructor(private quizzesService: QuizzesService) {
    this.quizzes$ = this.quizzesService.getQuizzes();
  }
}
