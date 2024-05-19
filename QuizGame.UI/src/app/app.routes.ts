import { Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {MainMenuComponent} from "../components/main-menu/main-menu.component";

export const routes: Routes = [
  {path: '', component: MainMenuComponent},
];
