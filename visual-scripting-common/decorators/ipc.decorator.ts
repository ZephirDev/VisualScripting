import {VisualScriptingIpcChannelsEnum} from "../enums/visual-scripting-ipc-channels.enum";
import {MessageInterface} from "../types/message.interface";
import {ExecutionContextBuilder} from "../builders/execution-context.builder";
import {EventsService} from "../services/events.service";
import {EventsEnum} from "../enums/events.enum";
import {PriorityEventsEnum} from "../enums/priority-events.enum";
import {HandlerInterface} from "../types/handler.interface";
import {ErrorBuilder} from "../builders/error.builder";
import {VisualScriptingIpcRaiseByEnum} from "../enums/visual-scripting-ipc-raise-by.enum";
import {VisualScriptingIpcErrorEnum} from "../enums/visual-scripting-ipc-error.enum";
import {ExecutionContext} from "../executions/execution.context";
import {MessageResultInterface} from "../types/message-result.interface";
import {PromiseContextHandler} from "../executions/promise-context.handler";
import {VisualScriptingIpcChannelsMethodEnum} from "../enums/visual-scripting-ipc-channels-method.enum";

export class IpcDecorator {
    private static readonly CLASS_NAME = 'IpcDecorator';

    private ipc: any;
    private channel: VisualScriptingIpcChannelsEnum;
    private channelListen: boolean;
    private handlers: {[name: string]: HandlerInterface<any>};
    private promiseHandler: {[uuid: string]: PromiseContextHandler};

    constructor(ipc: any, channel: VisualScriptingIpcChannelsEnum)
    {
        this.ipc = ipc;
        this.channel = channel;
        this.channelListen = false;
        this.handlers = {};
        this.promiseHandler = {};
    }

    private handle(event: any, message: any): void
    {
        if (message.method) {
            this.handleMessage(event, message).catch(console.log);
        } else {
            this.handleMessageResult(message).catch(console.log);
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
                                .klass(IpcDecorator.CLASS_NAME)
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
                        if (this.promiseHandler[ctx.getMessageResult().id]) {
                            this.promiseHandler[ctx.getMessageResult().id].resolve(ctx);
                            delete this.promiseHandler[ctx.getMessageResult().id];
                        } else {
                            ctx.addError(ErrorBuilder.For(VisualScriptingIpcRaiseByEnum.COMMON)
                                .klass(IpcDecorator.CLASS_NAME)
                                .build(VisualScriptingIpcErrorEnum.VisualScriptingIpcNoHandlerForMessage));
                        }
                        handle = true;
                    }
                }
            }]);
        } catch (exception) {
            ctx.getMessageResult().error = exception;
        }

        if (!handle && this.promiseHandler[ctx.getMessageResult().id]) {
            this.promiseHandler[ctx.getMessageResult().id].reject(ctx.getMessageResult().error || ErrorBuilder.For(VisualScriptingIpcRaiseByEnum.COMMON)
                .klass(IpcDecorator.CLASS_NAME)
                .build(VisualScriptingIpcErrorEnum.VisualScriptingIpcNoHandlerForMessage));
            delete this.promiseHandler[ctx.getMessageResult().id];
        }
    }

    async sendOverExecutionContext(context: ExecutionContext, timeout: number = 0): Promise<ExecutionContext>
    {
        if (!context.hasMessage()) {
            throw ErrorBuilder.For(VisualScriptingIpcRaiseByEnum.COMMON)
                .klass(IpcDecorator.CLASS_NAME)
                .attribute("context.message")
                .nullPointer();
        }

        let message = context.getMessage();
        if (this.promiseHandler[message.id]) {
            return this.promiseHandler[message.id].getPromise();
        }
        
        let promiseHandler = await PromiseContextHandler.newPromiseHandler();
        let timeoutId: number|null = null;
        if (timeout > 0) {
            timeoutId = setTimeout(() => {
                promiseHandler.reject(ErrorBuilder.For(VisualScriptingIpcRaiseByEnum.COMMON)
                    .klass(IpcDecorator.CLASS_NAME)
                    .addAnnotation("timeout", timeout)
                    .build(VisualScriptingIpcErrorEnum.VisualScriptingIpcMessageTimeout));
                delete this.promiseHandler[message.id];
            }, timeout);
        }
        
        this.promiseHandler[message.id] = promiseHandler;
        await EventsService.GetInstance().fire(EventsEnum.MESSAGE_SEND_EVENT, context, [{
            priority: PriorityEventsEnum.MESSAGE_SEND_EVENT.HANDLE,
            handler: {
                handle: async (ctx: ExecutionContext) => {
                    this.ipc.send(this.channel, message);
                }
            }
        }]);

        return promiseHandler.getPromise().finally(() => {
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
            }
        });
    }

    sendResultWithExecutionContext<ParameterType>(method: string, parameter: ParameterType, options: {timeout?: number} = {}): Promise<ExecutionContext>
    {
        return this.sendOverExecutionContext(ExecutionContextBuilder.newBuilder()
                .addMessageOfParameter(method, parameter)
                .build(),
            options.timeout || 0);
    }

    send<ParameterType, ResultType>(method: string, parameter: ParameterType, options: {notNull?: boolean, timeout?: number} = {}): Promise<ResultType|null>
    {
        return this.sendResultWithExecutionContext(method, parameter, options)
            .then(async (result) => {
                if (result.hasMessageResult()) {
                    let messageResult = result.getMessageResult<ResultType>();
                    if (messageResult.result || !options.notNull) {
                        return messageResult.result || null;
                    }
                }

                throw ErrorBuilder.For(VisualScriptingIpcRaiseByEnum.COMMON)
                    .build(VisualScriptingIpcErrorEnum.VisualScriptingIpcMessageEmptyReply);
            });
    }

    private guardListen()
    {
        if (this.channelListen) {
            throw ErrorBuilder.For(VisualScriptingIpcRaiseByEnum.COMMON)
                .build(VisualScriptingIpcErrorEnum.VisualScriptingIpcRunning);
        }
    }

    addHandler(method: VisualScriptingIpcChannelsMethodEnum, handler: HandlerInterface<void>): void
    {
        this.guardListen();

        if (this.handlers[method]) {
            throw ErrorBuilder.For(VisualScriptingIpcRaiseByEnum.COMMON)
                .addAnnotation("method", method)
                .build(VisualScriptingIpcErrorEnum.VisualScriptingIpcHandlerExist);
        }

        this.handlers[method] = handler;
    }

    listen()
    {
        if (this.channelListen) {
            return;
        }
        this.ipc.on(this.channel, this.handle.bind(this));
        this.channelListen = true;
    }
}