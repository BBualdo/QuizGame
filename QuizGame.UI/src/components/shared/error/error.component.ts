import { Component } from '@angular/core';
import { ErrorsService } from '../../../services/errors.service';
import { QuizzesService } from '../../../services/quizzes.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent {
  constructor(
    private quizzesService: QuizzesService,
    public errorService: ErrorsService,
  ) {}

  retry(): void {
    this.quizzesService.getQuizzes().subscribe();
  }
}
