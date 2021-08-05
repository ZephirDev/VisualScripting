import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OpentracingHelpers} from "./helpers/opentracing.helpers";
import {OpentracingTracerDecoratorInterface, OpentracingOptionsInterface, ExecutionContext, OpentracingSpanDecoratorInterface, PriorityEventHandlersInterface, EventsEnum, PriorityEventsEnum} from "visual-scripting-common";

@Injectable({
  providedIn: 'root'
})
export class VisualScriptingOpentracingService {
  private opentracingHelpers: OpentracingHelpers;
  private tracer?: OpentracingTracerDecoratorInterface;
  private rootSpan?: OpentracingSpanDecoratorInterface;
  private ipcEventHandlers: PriorityEventHandlersInterface[];

  constructor(
    private httpClient: HttpClient,
  )
  {
    this.opentracingHelpers = new OpentracingHelpers(this.httpClient);
    this.ipcEventHandlers = [{
      priorityEvent: {
        event: EventsEnum.MESSAGE_SEND_EVENT,
        priority: PriorityEventsEnum.MESSAGE_SEND_EVENT.PRE_HANDLE,
      },
      handlers: [{
        handle: async (ctx: ExecutionContext) => {
          if (this.rootSpan) {
            let message = ctx.getMessage() as any;
            message.opentracing = this.rootSpan.getPropagationValues();
          }
        }
      }],
    }]
  }

  createTracer(options: OpentracingOptionsInterface, name: string): void
  {
    this.tracer = this.opentracingHelpers.newClient(options).newTracer(name);
  }

  deleteTracer(): void
  {
    this.deleteRootSpan();
    if (this.tracer) {
      delete this.tracer;
    }
  }

  withTracer(handler: (t: OpentracingTracerDecoratorInterface) => void)
  {
    if (this.tracer) {
      handler(this.tracer);
    }
  }

  getTracer(): OpentracingTracerDecoratorInterface|undefined
  {
    return this.tracer;
  }

  createRootSpan(name: string): boolean
  {
    if (this.tracer) {
      this.rootSpan = this.tracer.createSpan(null, name);
      return true;
    }

    return false;
  }

  deleteRootSpan(): void
  {
    if (this.rootSpan) {
      this.rootSpan.finish();
      delete this.rootSpan;
    }
  }

  getRootSpan(): OpentracingSpanDecoratorInterface|undefined
  {
    return this.rootSpan;
  }

  withRootSpan(fn: (span: OpentracingSpanDecoratorInterface) => void)
  {
    if (this.rootSpan) {
      fn(this.rootSpan);
    }
  }

  getIpcEventHandlers(): PriorityEventHandlersInterface[]
  {
    return this.ipcEventHandlers;
  }
}
