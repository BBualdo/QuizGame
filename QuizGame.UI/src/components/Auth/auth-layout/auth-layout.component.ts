import { Component } from '@angular/core';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { RouterOutlet } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [BackButtonComponent, RouterOutlet, NgOptimizedImage],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {}
