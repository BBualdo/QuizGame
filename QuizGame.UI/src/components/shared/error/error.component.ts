import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ErrorsService } from '../../../services/errors.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent {
  @Output() retryEmitter = new EventEmitter<void>();
  constructor(public errorService: ErrorsService) {}

  retry() {
    this.retryEmitter.emit();
  }
}
