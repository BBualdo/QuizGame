import { Routes } from '@angular/router';
import { MainMenuComponent } from '../components/main-menu/main-menu.component';
import { QuizManagerLayout } from '../components/Quiz-Management/quiz-manager/quiz-manager.component';
import { QuizDetailsComponent } from '../components/Quiz-Management/quiz-details/quiz-details.component';
import { QuizListComponent } from '../components/Quiz-Management/quiz-list/quiz-list.component';
import { CreateQuizComponent } from '../components/Quiz-Management/Quiz-Creator/create-quiz/create-quiz.component';
import { StepperComponent } from '../components/Quiz-Management/Quiz-Creator/stepper/stepper.component';
import { SelectQuizComponent } from '../components/Game-Session/select-quiz/select-quiz.component';
import { GameSessionLayout } from '../components/Game-Session/game-session/game-session.component';
import { SelectDifficultyComponent } from '../components/Game-Session/select-difficulty/select-difficulty.component';

export const routes: Routes = [
  { path: '', component: MainMenuComponent },
  {
    path: 'play',
    component: GameSessionLayout,
    children: [
      { path: '', component: SelectQuizComponent },
      { path: 'difficulty', component: SelectDifficultyComponent },
    ],
  },
  {
    path: 'quiz-management',
    component: QuizManagerLayout,
    children: [
      { path: '', component: QuizListComponent },
      {
        path: 'create',
        children: [
          { path: '', component: CreateQuizComponent },
          { path: 'steps', component: StepperComponent },
        ],
      },
      { path: ':id', component: QuizDetailsComponent },
    ],
  },
];
