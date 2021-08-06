import {OptionsServiceInstance} from "./options.service";
import {OpentracingTracerDecoratorInterface} from "../common/decorators/opentracing-tracer-decorator.interface";
import {OpentracingHelper} from "../helpers/opentracing.helper";
import {OpentracingSpanDecoratorInterface} from "../common/decorators/opentracing-span-decorator.interface";
import {PriorityEventHandlersInterface} from "../common/types/priority-event-handlers.interface";
import {EventsEnum} from "../../../visual-scripting-common/enums/events.enum";
import {PriorityEventsEnum} from "../common/enums/priority-events.enum";
import {ExecutionContext} from "../common/executions/execution.context";

export class OpentracingService {
    private opentracingIpcHandlers: PriorityEventHandlersInterface[];
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
        this.opentracingIpcHandlers = [{
            priorityEvent: {
                event: EventsEnum.MESSAGE_EVENT,
                priority: PriorityEventsEnum.MESSAGE_EVENT.PRE_HANDLE,
            },
            handlers: [{
                handle: async (context: ExecutionContext) => {
                    let message = context.getMessage();
                    let messageAsAny = message as any;
                    if (this.tracer) {
                        context.attach({
                            opentracingSpan: messageAsAny.opentracing
                                ? this.tracer.createSpanFromPropagations(messageAsAny.opentracing, message.method)
                                : this.tracer.createSpan(null, message.method),
                        });
                    }
                }
            }]
        }, {
            priorityEvent: {
                event: EventsEnum.MESSAGE_EVENT,
                priority: PriorityEventsEnum.MESSAGE_EVENT.PRE_WRITE,
            },
            handlers: [{
                handle: async (context: ExecutionContext) => {
                    if (!context.hasMessageResult() || !context.hasOpentracingSpan()) {
                        return;
                    }

                    let result = context.getMessageResult() as any;
                    result.opentracing = context.getOpentracingSpan().getPropagationValues();
                }
            }],
        }, {
            priorityEvent: {
                event: EventsEnum.MESSAGE_EVENT,
                priority: PriorityEventsEnum.MESSAGE_EVENT.POST_WRITE,
            },
            handlers: [{
                handle: async (context: ExecutionContext) => {
                    if (!context.hasOpentracingSpan()) {
                        return;
                    }

                    let span = context.getOpentracingSpan();
                    span.tag('message.status', !context.hasMessageResult() || context.getMessageResult().error
                        ? 'FAILURE'
                        : 'SUCCESS');
                    span.finish();
                }
            }],
        }];
    }

    getOpentracingIpcHandlers(): PriorityEventHandlersInterface[]
    {
        return this.opentracingIpcHandlers;
    }
}

export const OpentracingServiceInstance = new OpentracingService();