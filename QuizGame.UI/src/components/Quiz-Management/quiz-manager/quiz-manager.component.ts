import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';

@Component({
  selector: 'app-quiz-manager',
  standalone: true,
  imports: [RouterOutlet, BackButtonComponent],
  templateUrl: './quiz-manager.component.html',
})
export class QuizManagerLayout {}
