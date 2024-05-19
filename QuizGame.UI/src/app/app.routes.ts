import { Routes } from '@angular/router';
import { MainMenuComponent } from '../components/main-menu/main-menu.component';
import { QuizManagerComponent } from '../components/quiz-manager/quiz-manager.component';

export const routes: Routes = [
  { path: '', component: MainMenuComponent },
  { path: 'quiz-management', component: QuizManagerComponent },
];
