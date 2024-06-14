import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { environment } from '../environment';
import { url } from '../config/config';
import { ErrorDialogComponent } from '../components/shared/error-dialog/error-dialog.component';
import { ErrorsService } from './errors.service';
import { BehaviorSubject, catchError, finalize, of } from 'rxjs';
import { Dialog } from '@angular/cdk/dialog';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  constructor(
    private http: HttpClient,
    private errorsService: ErrorsService,
    private dialog: Dialog,
    private userService: UserService,
  ) {}

  loginWithGoogle() {
    const params = new HttpParams()
      .set('client_id', environment.google.clientId)
      .set('redirect_uri', environment.google.redirectUri)
      .set('response_type', 'code')
      .set('scope', 'profile email')
      .set('access_type', 'offline');

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  handleGoogleCallback(code: string) {
    this.errorsService.clear();
    this.isLoadingSubject.next(true);
    return this.http
      .post<{ token: string }>(url + 'google/sign-in', {
        code,
      })
      .pipe(
        catchError((error) => of(this.handleErrors(error))),
        finalize(() => {
          this.isLoadingSubject.next(false);
          this.userService.getCurrentUser().subscribe();
        }),
      );
  }

  private handleErrors(error: HttpErrorResponse): any {
    // TODO:Error handling
    console.log(error);

    this.dialog.open(ErrorDialogComponent);
    return;
  }
}
