import { Component } from '@angular/core';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { RouterOutlet } from '@angular/router';
import { GamesService } from '../../../services/games.service';
import { ErrorsService } from '../../../services/errors.service';
import { Observable } from 'rxjs';
import { AsyncPipe, formatDate } from '@angular/common';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { ErrorComponent } from '../../shared/error/error.component';
import { DataService } from '../../../services/data.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [
    BackButtonComponent,
    RouterOutlet,
    AsyncPipe,
    LoadingSpinnerComponent,
    ErrorComponent,
    MatIcon,
  ],
  templateUrl: './leaderboard.component.html',
})
export class LeaderboardComponent {
  currentPage = 1;

  games$ = this.dataService.games$;
  isLoading$: Observable<boolean> = this.gamesService.isLoading$;
  isError$: Observable<boolean> = this.errorsService.isError$;

  constructor(
    private gamesService: GamesService,
    private errorsService: ErrorsService,
    private dataService: DataService,
  ) {}

  nextPage(total: number) {
    if (this.currentPage === total) {
      return;
    }
    this.currentPage++;
    this.dataService.refreshGames(this.currentPage);
  }

  previousPage() {
    if (this.currentPage === 1) {
      return;
    }
    this.currentPage--;
    this.dataService.refreshGames(this.currentPage);
  }

  retry() {
    this.games$.subscribe();
  }

  protected readonly formatDate = formatDate;
}
