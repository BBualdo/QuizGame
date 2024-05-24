import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'countdown-timer',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './timer.component.html',
  styleUrl: 'timer.component.css',
})
export class TimerComponent {
  @Input() time: number | null = null;
}
