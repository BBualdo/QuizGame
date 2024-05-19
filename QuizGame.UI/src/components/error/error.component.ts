import { Component } from '@angular/core';
import { ErrorsService } from '../../services/errors.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent {
  constructor(public errorService: ErrorsService) {}
}
