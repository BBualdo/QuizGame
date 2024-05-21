import { Routes } from '@angular/router';
import { MainMenuComponent } from '../components/main-menu/main-menu.component';
import { QuizManagerComponent } from '../components/quiz-manager/quiz-manager.component';
import { QuizDetailsComponent } from '../components/quiz-details/quiz-details.component';
import { QuizListComponent } from '../components/quiz-list/quiz-list.component';

export const routes: Routes = [
  { path: '', component: MainMenuComponent },
  {
    path: 'quiz-management',
    component: QuizManagerComponent,
    children: [
      { path: '', component: QuizListComponent },
      { path: ':id', component: QuizDetailsComponent },
    ],
  },
];
