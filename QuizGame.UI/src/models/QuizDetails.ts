import { Question } from './Question';

export interface QuizDetails {
  quizId: number;
  name: string;
  questions: Question[];
}
