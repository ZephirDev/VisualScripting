import {VisualScriptingIpcEventHandlersInterface} from "../common/types/visual-scripting-ipc-event-handlers.interface";
import {OptionsServiceInstance} from "./options.service";
import {OpentracingTracerDecoratorInterface} from "../common/decorators/opentracing-tracer-decorator.interface";
import {OpentracingHelper} from "../helpers/opentracing.helper";
import {OpentracingSpanDecoratorInterface} from "../common/decorators/opentracing-span-decorator.interface";

export class OpentracingService {
    private opentracingIpcHandlers: VisualScriptingIpcEventHandlersInterface;
    private opentracingHelpers: OpentracingHelper;
    private tracer: OpentracingTracerDecoratorInterface | null;
    private spans: {[k: string]: OpentracingSpanDecoratorInterface};

    constructor() {
        this.opentracingHelpers = new OpentracingHelper();
        this.tracer = null;
        this.spans = {};
        OptionsServiceInstance.getOpentracingOptions()
        .then(options => {
            if (options) {
                this.tracer = this.opentracingHelpers.newClient(options).newTracer("visual-scripting.electron");
            }
        })
        .catch(console.log);
        this.opentracingIpcHandlers = {
            onMessage: (messageInterface => {
                if (!this.tracer) return;

                let object = messageInterface as any;
                if (object.opentracing) {
                    this.spans[messageInterface.id] = this.tracer.createSpanFromPropagations(object.opentracing, messageInterface.method);
                }
            }),
            onMessageResultSend: (messageResultInterface => {
                if (!this.tracer || !this.spans[messageResultInterface.id]) return;
                let object = messageResultInterface as any;
                let span = this.spans[messageResultInterface.id];
                span.finish();
                object.opentracing = span.getPropagationValues();
                delete this.spans[messageResultInterface.id];
            })
        } as VisualScriptingIpcEventHandlersInterface;
    }

    getOpentracingIpcHandlers(): VisualScriptingIpcEventHandlersInterface
    {
        return this.opentracingIpcHandlers;
    }
}

export const OpentracingServiceInstance = new OpentracingService();