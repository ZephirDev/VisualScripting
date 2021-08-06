import {Component, OnInit} from '@angular/core';
import {Observable, timer} from "rxjs";
import {VisualScriptingOpentracingService} from "./visual-scripting-opentracing.service";

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
  position: string = '';

  constructor(
    private opentracingService: VisualScriptingOpentracingService
  )
  {
    this.record = false;
    this.timer = timer(0, 1000);
    this.setBottomLeftPosition();
  }

  ngOnInit(): void
  {
    this.timer.subscribe(this.calcTimerValue.bind(this));
  }

  startRecord()
  {
    if (this.opentracingService.getTracer()) {
      this.record = true;
      this.timestamp = Date.now();
      this.opentracingService.createRootSpan("Recorder");
    }
  }

  stopRecord()
  {
    this.record = false;
    this.timestamp = -1;
    let rootSpan = this.opentracingService.getRootSpan();
    if (rootSpan) {
      this.opentracingService.deleteRootSpan();
    }
  }

  canRecord(): boolean
  {
    return this.opentracingService.getTracer() != null;
  }

  isRecording(): boolean
  {
    return this.record;
  }

  getRootSpanTraceId(): string
  {
    let rootSpan = this.opentracingService.getRootSpan();
    if (rootSpan) {
      return rootSpan.getTraceId();
    }
    return "";
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

  setTopLeftPosition(): void
  {
    this.position = 'top-left';
  }

  isTopLeftPosition(): boolean
  {
    return this.position == 'top-left';
  }

  setTopRightPosition(): void
  {
    this.position = 'top-right';
  }

  isTopRightPosition(): boolean
  {
    return this.position == 'top-right';
  }

  setBottomLeftPosition(): void
  {
    this.position = 'bottom-left';
  }

  isBottomLeftPosition(): boolean
  {
    return this.position == 'bottom-left';
  }

  setBottomRightPosition(): void
  {
    this.position = 'bottom-right';
  }

  isBottomRightPosition(): boolean
  {
    return this.position == 'bottom-right';
  }

  dynamicToolbarButtonClass(): string
  {
    if (this.isTopLeftPosition()) {
      return 'p-top-left';
    } else if (this.isTopRightPosition()) {
      return 'p-top-right';
    } else if (this.isBottomRightPosition()) {
      return 'p-bottom-right';
    } else {
      return 'p-bottom-left';
    }
  }
}
