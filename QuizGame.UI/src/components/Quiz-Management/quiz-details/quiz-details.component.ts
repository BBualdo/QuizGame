import { Component, Input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ErrorComponent } from '../../shared/error/error.component';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { QuizDetails } from '../../../models/QuizDetails';
import { Observable } from 'rxjs';
import { QuizzesService } from '../../../services/quizzes.service';
import { ErrorsService } from '../../../services/errors.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-quiz-details',
  standalone: true,
  imports: [
    AsyncPipe,
    ErrorComponent,
    LoadingSpinnerComponent,
    BackButtonComponent,
  ],
  templateUrl: './quiz-details.component.html',
  styleUrl: './quiz-details.component.css',
})
export class QuizDetailsComponent {
  @Input() id: string = '';

  quiz$: Observable<QuizDetails | null> = this.dataService.quiz$;
  isLoading$: Observable<boolean> = this.quizzesService.isLoading$;
  isError$: Observable<boolean> = this.errorService.isError$;

  constructor(
    private quizzesService: QuizzesService,
    private errorService: ErrorsService,
    private dataService: DataService,
  ) {}

  ngOnInit(): void {
    if (this.id) {
      this.dataService.refreshQuiz(Number(this.id));
    }
  }

  retry() {
    this.quizzesService.getQuiz(Number(this.id)).subscribe();
  }
}
