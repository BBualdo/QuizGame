import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { GameReqDTO } from '../../../models/GameReqDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-results',
  standalone: true,
  imports: [],
  templateUrl: './game-results.component.html',
})
export class GameResultsComponent {
  game: GameReqDTO | null = null;
  summaryText = '';

  constructor(
    private gameService: GameService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.gameService.newGame$.subscribe((game) => (this.game = game));
    this.validateResults();
    this.generateSummaryText();
  }

  playAgain() {
    this.gameService.clearGame();
    this.router.navigate(['play']);
  }

  mainMenu() {
    this.router.navigate(['']);
  }

  private generateSummaryText() {
    const score = this.game!.score!;
    if (score <= 20) {
      this.summaryText = 'Try again';
    } else if (score <= 40) {
      this.summaryText = 'Not bad';
    } else if (score <= 60) {
      this.summaryText = 'Good job';
    } else if (score <= 80) {
      this.summaryText = 'Nicely done';
    } else {
      this.summaryText = 'Amazing work';
    }
  }

  private validateResults() {
    if (!this.game?.score) {
      this.router.navigate(['play']);
    }
  }
}
