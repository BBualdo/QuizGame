import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from '../models/Quiz';
import { url } from '../config/config';

@Injectable({
  providedIn: 'root',
})
export class QuizzesService {
  constructor(private http: HttpClient) {}

  getQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(url + 'Quizzes');
  }
}
