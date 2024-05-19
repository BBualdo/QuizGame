import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorsService {
  isError$: Observable<boolean> = of(false);
  errors: string[] = [];

  constructor() {}

  add(error: string) {
    this.isError$ = of(true);
    this.errors.push(error);
  }

  clear() {
    this.errors = [];
    this.isError$ = of(false);
  }
}
