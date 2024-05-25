import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { ErrorsService } from './errors.service';
import { GameReqDTO } from '../models/DTOs/GameReqDTO';
import { url } from '../config/config';
import { Game } from '../models/Game';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  constructor(
    private http: HttpClient,
    private errorsService: ErrorsService,
  ) {}

  addGame(game: GameReqDTO): Observable<GameReqDTO> {
    this.errorsService.clear();
    this.isLoadingSubject.next(true);
    return this.http.post(url + 'Games', game).pipe(
      catchError((error) => of(this.handleError(error))),
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  getGames(): Observable<Game[]> {
    this.errorsService.clear();
    this.isLoadingSubject.next(true);
    return this.http.get<Game[]>(url + 'Games/').pipe(
      catchError((error) => of(this.handleError(error))),
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.status === 0) {
      this.errorsService.add("Couldn't connect to Quizzes API.");
    }
    if (error.status === 500) {
      this.errorsService.add('Something went wrong. Try again later.');
    }
    return;
  }
}
