import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ErrorComponent } from '../../shared/error/error.component';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-select-difficulty',
  standalone: true,
  imports: [AsyncPipe, ErrorComponent, LoadingSpinnerComponent, RouterLink],
  templateUrl: './select-difficulty.component.html',
})
export class SelectDifficultyComponent {}
