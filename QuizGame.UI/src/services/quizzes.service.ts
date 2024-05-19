import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, Observable, of } from 'rxjs';
import { Quiz } from '../models/Quiz';
import { url } from '../config/config';
import { ErrorsService } from './errors.service';

@Injectable({
  providedIn: 'root',
})
export class QuizzesService {
  isLoading$: Observable<boolean> = of(false);

  constructor(
    private http: HttpClient,
    private errorsService: ErrorsService,
  ) {}

  getQuizzes(): Observable<Quiz[]> {
    this.isLoading$ = of(true);
    return this.http.get<Quiz[]>(url + 'Quizzes').pipe(
      catchError((error) => of(this.handleError(error))),
      finalize(() => (this.isLoading$ = of(false))),
    );
  }

  handleError(error: HttpErrorResponse): Quiz[] {
    if (error.status === 0) {
      this.errorsService.add("Couldn't connect to Quizzes API.");
    }
    return [];
  }
}
