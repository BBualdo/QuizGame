export interface GameReqDTO {
  username: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | undefined;
  date: string;
  score: number;
  quizId: number;
}
