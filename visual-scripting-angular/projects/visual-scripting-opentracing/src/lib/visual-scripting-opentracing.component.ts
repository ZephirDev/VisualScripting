import { Component, OnInit } from '@angular/core';
import {Observable, Subscription, timer} from "rxjs";

@Component({
  selector: 'visual-scripting-opentracing',
  templateUrl: './visual-scripting-opentracing.component.html',
  styleUrls: ['./visual-scripting-opentracing.component.scss'],
})
export class VisualScriptingOpentracingComponent implements OnInit {
  private record: boolean;
  private timestamp: number = -1;
  private timer: Observable<number>;
  private timerString: string = "";
  private toolbarDisplay: boolean = false;

  constructor()
  {
    this.record = false;
    this.timer = timer(0, 1000);
  }

  ngOnInit(): void
  {
    this.timer.subscribe(this.calcTimerValue.bind(this));
  }

  startRecord()
  {
    this.record = true;
    this.timestamp = Date.now();
  }

  stopRecord()
  {
    this.record = false;
    this.timestamp = -1;
  }

  isRecording(): boolean
  {
    return this.record;
  }

  getDuration(): number
  {
    if (this.timestamp === -1) {
      return 0;
    }
    return (Date.now() - this.timestamp) / 1000;
  }

  getTimerValue(): string
  {
    return this.timerString;
  }

  isToolbarDisplayed(): boolean
  {
    return this.toolbarDisplay;
  }

  setToolbarDisplay(display: boolean)
  {
    this.toolbarDisplay = display;
  }

  private calcTimerValue()
  {
    let time = Math.floor(this.getDuration());
    let zeroPlaceholder = (x: number, minDigit: number) => {
        let r = x.toString();
        for (let i = 1; Math.pow(10, i) <= Math.pow(10, minDigit-1); i++) {
          if (x < Math.pow(10, i)) {
            r = "0" + r;
          }
        }
        return r;
    }
    this.timerString = `${zeroPlaceholder(Math.floor(time / 3600), 2)}:${zeroPlaceholder(Math.floor((time / 60) % 60), 2)}:${zeroPlaceholder(time % 60, 2)}`;
  }
}
