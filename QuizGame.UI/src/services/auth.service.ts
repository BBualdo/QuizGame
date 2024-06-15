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
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
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

  handleGoogleCallback(code: string): Observable<any> {
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

  loginWithFacebook() {
    const params = new HttpParams()
      .set('client_id', environment.facebook.appId)
      .set('redirect_uri', environment.facebook.redirectUri)
      .set('response_type', 'code')
      .set('scope', 'email')
      .set('auth_type', 'reauthenticate');

    window.location.href = `https://www.facebook.com/v20.0/dialog/oauth?${params.toString()}`;
  }

  handleFacebookCallback(code: string): Observable<any> {
    this.errorsService.clear();
    this.isLoadingSubject.next(true);
    return this.http
      .post<{ token: string }>(url + 'facebook/sign-in', { code })
      .pipe(
        catchError((error) => of(this.handleErrors(error))),
        finalize(() => {
          this.isLoadingSubject.next(false);
          this.userService.getCurrentUser().subscribe();
        }),
      );
  }

  loginWithMicrosoft() {
    const params = new HttpParams()
      .set('client_id', environment.microsoft.clientId)
      .set('response_type', 'code')
      .set('redirect_uri', environment.microsoft.redirectUri)
      .set('scope', 'openid profile email')
      .set('prompt', 'login');

    window.location.href = `https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?${params.toString()}`;
  }

  handleMicrosoftCallback(code: string): Observable<any> {
    this.errorsService.clear();
    this.isLoadingSubject.next(true);
    return this.http
      .post<{ token: string }>(url + 'microsoft/sign-in', { code })
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
