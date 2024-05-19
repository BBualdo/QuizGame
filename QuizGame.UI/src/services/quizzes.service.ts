import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { Quiz } from '../models/Quiz';
import { url } from '../config/config';
import { ErrorsService } from './errors.service';

@Injectable({
  providedIn: 'root',
})
export class QuizzesService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  constructor(
    private http: HttpClient,
    private errorsService: ErrorsService,
  ) {}

  getQuizzes(): Observable<Quiz[]> {
    this.errorsService.clear();
    this.isLoadingSubject.next(true);
    return this.http.get<Quiz[]>(url + 'Quizzes').pipe(
      catchError((error) => of(this.handleError(error))),
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  handleError(error: HttpErrorResponse): Quiz[] {
    if (error.status === 0) {
      this.errorsService.add("Couldn't connect to Quizzes API.");
    }
    return [];
  }
}
