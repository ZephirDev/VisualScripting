import {VisualScriptingIpcChannelsEnum} from "../../../../../../visual-scripting-common/enums/visual-scripting-ipc-channels.enum";
import {MessageInterface} from "../../../../../../visual-scripting-common/types/message.interface";
import {ExecutionContextBuilder} from "../builders/execution-context.builder";
import {EventsService} from "../services/events.service";
import {EventsEnum} from "../enums/events.enum";
import {PriorityEventsEnum} from "../enums/priority-events.enum";
import {HandlerInterface} from "../types/handler.interface";
import {ErrorBuilder} from "../builders/error.builder";
import {VisualScriptingIpcRaiseByEnum} from "../../../../../../visual-scripting-common/enums/visual-scripting-ipc-raise-by.enum";
import {VisualScriptingIpcErrorEnum} from "../enums/visual-scripting-ipc-error.enum";
import {ExecutionContext} from "../executions/execution.context";
import {MessageResultInterface} from "../types/message-result.interface";
import {PromiseContextHandler} from "../executions/promise-context.handler";

export class IpcDecorator {
    private ipc: any;
    private channel: VisualScriptingIpcChannelsEnum;
    private channelListen: boolean;
    private handlers: {[name: string]: HandlerInterface<any>};
    private promiseHandler: {[name: string]: PromiseContextHandler};


    constructor(ipc: any, channel: VisualScriptingIpcChannelsEnum)
    {
        this.ipc = ipc;
        this.channel = channel;
        this.channelListen = false;
        this.handlers = {};
    }

    private handle(event: any, message: any): void
    {
        if (message.method) {
            this.handleMessage(event, message);
        } else {
            this.handleMessageResult(event, message);
        }
    }

    private async handleMessage(event: any, message: MessageInterface): Promise<void>
    {
        let reply = false;
        let ctx = ExecutionContextBuilder.newBuilder().addMessage(message).build();
        try {
            await EventsService.GetInstance().fire(EventsEnum.MESSAGE_EVENT, ctx, [{
                priority: PriorityEventsEnum.MESSAGE_EVENT.HANDLE,
                handler: {
                    handle: async (ctx: ExecutionContext) => {
                        if (this.handlers[message.method]) {
                            await this.handlers[message.method].handle(ctx);
                        } else {
                            ctx.addError(ErrorBuilder.For(VisualScriptingIpcRaiseByEnum.COMMON)
                                .klass(IpcDecorator)
                                .build(VisualScriptingIpcErrorEnum.VisualScriptingIpcNoHandlerForMessage));
                        }
                    }
                }
            }, {
                priority: PriorityEventsEnum.MESSAGE_EVENT.WRITE,
                handler: {
                    handle: async (ctx: ExecutionContext) => {
                        if (!ctx.hasMessageResult()) {
                            ctx.addResult(null);
                        }
                        event.reply(this.channel, ctx.getMessageResult());
                        reply = true;
                    }
                }
            }]);
        } catch (exception) {
            if (!reply) {
                ctx.addError(exception);
                event.reply(this.channel, ctx.getMessageResult());
            }
        }
    }

    private async handleMessageResult(messageResult: MessageResultInterface): Promise<void>
    {
        let handle = false;
        let ctx = ExecutionContextBuilder.newBuilder().addMessageResult(messageResult).build();
        try {
            await EventsService.GetInstance().fire(EventsEnum.MESSAGE_RESULT_EVENT, ctx, [{
                priority: PriorityEventsEnum.MESSAGE_RESULT_EVENT.HANDLE,
                handler: {
                    handle: async (ctx: ExecutionContext) => {
                        if (this.handlers[message.method]) {
                            await this.handlers[message.method].handle(ctx);
                        } else {
                            ctx.addError(ErrorBuilder.For(VisualScriptingIpcRaiseByEnum.COMMON)
                                .klass(IpcDecorator)
                                .build(VisualScriptingIpcErrorEnum.VisualScriptingIpcNoHandlerForMessage));
                        }
                    }
                }
            }]);
        } catch (exception) {

        }
    }
}