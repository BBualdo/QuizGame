import { Component } from '@angular/core';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-game-session',
  standalone: true,
  imports: [BackButtonComponent, RouterOutlet],
  templateUrl: './game-session.component.html',
})
export class GameSessionLayout {}
