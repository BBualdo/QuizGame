import { Component } from '@angular/core';
import {BackButtonComponent} from "../shared/back-button/back-button.component";

@Component({
  selector: 'app-quiz-manager',
  standalone: true,
  imports: [BackButtonComponent],
  templateUrl: './quiz-manager.component.html',
  styleUrl: './quiz-manager.component.css',
})
export class QuizManagerComponent {}
