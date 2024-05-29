import { Component } from '@angular/core';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [BackButtonComponent, RouterLink],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {}
