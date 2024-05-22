import { Routes } from '@angular/router';
import { MainMenuComponent } from '../components/main-menu/main-menu.component';
import { QuizManagerComponent } from '../components/Quiz-Management/quiz-manager/quiz-manager.component';
import { QuizDetailsComponent } from '../components/Quiz-Management/quiz-details/quiz-details.component';
import { QuizListComponent } from '../components/Quiz-Management/quiz-list/quiz-list.component';
import { CreateQuizComponent } from '../components/Quiz-Management/Quiz-Creator/create-quiz/create-quiz.component';
import { StepperComponent } from '../components/Quiz-Management/Quiz-Creator/stepper/stepper.component';

export const routes: Routes = [
  { path: '', component: MainMenuComponent },
  {
    path: 'quiz-management',
    component: QuizManagerComponent,
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
