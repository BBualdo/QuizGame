import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './main-menu.component.html',
})
export class MainMenuComponent {
  isLoggedIn$: Observable<boolean>;

  constructor(private userService: UserService) {
    this.isLoggedIn$ = this.userService.isLoggedIn$;
  }
}
