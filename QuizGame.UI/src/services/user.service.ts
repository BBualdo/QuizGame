import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserRegister } from '../models/UserRegister';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { url } from '../config/config';
import { ErrorsService } from './errors.service';
import { ErrorDetails } from '../models/ErrorDetails';
import { Dialog } from '@angular/cdk/dialog';
import { ErrorDialogComponent } from '../components/shared/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private http: HttpClient,
    private errorsService: ErrorsService,
    private dialog: Dialog,
  ) {}

  registerUser(user: UserRegister): Observable<UserRegister> {
    this.errorsService.clear();
    this.isLoadingSubject.next(true);
    return this.http.post(url + 'Account/register', user).pipe(
      catchError((error) => of(this.handleErrors(error))),
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  checkLoginStatus() {
    const isLoggedIn = this.hasToken();
    this.isLoggedInSubject.next(isLoggedIn);
  }

  private handleErrors(error: HttpErrorResponse): any {
    if (error.status === 200) {
      return;
    }

    if (error.status === 500) {
      this.errorsService.add('Something bad happened. Try again later.');
    }

    if (error.status === 400) {
      error.error.forEach((err: ErrorDetails) =>
        this.errorsService.add(err.description),
      );
    }
    this.dialog.open(ErrorDialogComponent);
    return;
  }

  private hasToken(): boolean {
    return document.cookie.includes('QuizGameToken');
  }
}
