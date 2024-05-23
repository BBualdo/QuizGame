import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameReqDTO } from '../models/GameReqDTO';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private newGameSubject = new BehaviorSubject<GameReqDTO | null>(null);
  newGame$ = this.newGameSubject.asObservable();

  updateNewGame(game: GameReqDTO) {
    this.newGameSubject.next(game);
  }
}
