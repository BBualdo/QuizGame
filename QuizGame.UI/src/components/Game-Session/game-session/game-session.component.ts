import { Component } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-game-session',
  standalone: true,
  imports: [TimerComponent],
  templateUrl: './game-session.component.html',
})
export class GameSessionComponent {}
