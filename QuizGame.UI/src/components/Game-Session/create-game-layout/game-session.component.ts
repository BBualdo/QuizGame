import { Component } from '@angular/core';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-create-game-layout',
  standalone: true,
  imports: [BackButtonComponent, RouterOutlet],
  templateUrl: './game-session.component.html',
})
export class CreateGameLayout {
  constructor(
    private router: Router,
    private gameService: GameService,
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (!event.url.startsWith('/play')) {
          this.gameService.clearGame();
        }
      }
    });
  }
}
