import { Component } from '@angular/core';
import {BackButtonComponent} from "../../shared/back-button/back-button.component";

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [BackButtonComponent],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.css',
})
export class CreateQuizComponent {}
