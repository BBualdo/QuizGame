import { Component, Input, numberAttribute, OnChanges, OnInit } from "@angular/core";
import { NgStyle } from '@angular/common';
import { TimerService } from '../../../services/timer.service';
import { Answer } from "../../../models/Answer";

@Component({
  selector: 'countdown-timer',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './timer.component.html',
})
export class TimerComponent implements OnInit, OnChanges{
  @Input() time: number | null = null;
  timeLeft: number | null = null;

  @Input() selectedAnswer : Answer | null = null;

  constructor(private timerService: TimerService) {}

  ngOnInit() {
    this.start()

    this.timerService.timeLeft$.subscribe(
      (timeLeft) => (this.timeLeft = timeLeft),
    );
  }

  ngOnChanges() {
    if (this.selectedAnswer) {
      this.stop()
    } else {
      this.start()
    }
  }

  start() {
    if (this.time !== null) {
      this.timerService.start(this.time);
    }
  }

  stop() {
    this.timerService.stop();
  }
}
