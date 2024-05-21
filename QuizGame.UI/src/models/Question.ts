import { Answer } from './Answer';

export interface Question {
  name: string;
  difficulty: string;
  answers: Answer[];
}
