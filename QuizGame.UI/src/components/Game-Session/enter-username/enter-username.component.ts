import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { GameService } from '../../../services/game.service';
import { NavigationStart, Router } from '@angular/router';
import { GameReqDTO } from '../../../models/GameReqDTO';

@Component({
  selector: 'app-enter-username',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './enter-username.component.html',
})
export class EnterUsernameComponent {
  game: GameReqDTO | null = null;

  username = new FormControl<string>('', [
    Validators.required,
    Validators.maxLength(50),
  ]);

  constructor(
    private gameService: GameService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.gameService.newGame$.subscribe((game) => (this.game = game));
    if (this.game) {
      this.loadUsername();
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (!event.url.startsWith('/play')) {
          this.gameService.clearGame();
        }
      }
    });
  }

  proceed() {
    this.username.markAsTouched();
    if (this.username.valid) {
      this.gameService.updateUsername(this.username.value!);
      this.router.navigate(['play/quiz'], { skipLocationChange: true });
    }
  }

  loadUsername() {
    if (this.game) {
      this.username.setValue(this.game.username);
    }
  }
}
