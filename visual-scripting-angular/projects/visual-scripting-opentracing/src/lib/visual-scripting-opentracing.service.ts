import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OpentracingHelpers} from "./helpers/opentracing.helpers";
import {OpentracingTracerDecoratorInterface, OpentracingOptionsInterface, MessageInterface, OpentracingSpanDecoratorInterface, VisualScriptingIpcEventHandlersInterface} from "visual-scripting-common";

@Injectable({
  providedIn: 'root'
})
export class VisualScriptingOpentracingService {
  private opentracingHelpers: OpentracingHelpers;
  private tracer?: OpentracingTracerDecoratorInterface;
  private rootSpan?: OpentracingSpanDecoratorInterface;
  private ipcEventHandlers: VisualScriptingIpcEventHandlersInterface;

  constructor(
    private httpClient: HttpClient,
  )
  {
    this.opentracingHelpers = new OpentracingHelpers(this.httpClient);
    this.ipcEventHandlers = {
      onMessageSend: (message: MessageInterface) => {
        if (!this.rootSpan) return;
        let object = message as any;
        object.opentracing = this.rootSpan!.getPropagationValues();
      }
    } as VisualScriptingIpcEventHandlersInterface;
  }

  createTracer(options: OpentracingOptionsInterface, name: string): void
  {
    this.tracer = this.opentracingHelpers.newClient(options).newTracer(name);
    this.rootSpan = this.tracer.createSpan(null, "root");
  }

  deleteTracer(): void
  {
    if (this.rootSpan) {
      delete this.rootSpan;
    }

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

  getRootSpan(): OpentracingSpanDecoratorInterface|undefined
  {
    return this.rootSpan;
  }

  getIpcEventHandlers(): VisualScriptingIpcEventHandlersInterface
  {
    return this.ipcEventHandlers;
  }
}
