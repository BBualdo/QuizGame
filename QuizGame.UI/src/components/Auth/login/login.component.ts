import { Component } from "@angular/core";
import { BackButtonComponent } from "../../shared/back-button/back-button.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [BackButtonComponent, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {}
