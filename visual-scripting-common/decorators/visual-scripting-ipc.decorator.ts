import { MessageResultInterface } from './../types/message-result.interface';
import { VisualScriptingIpcErrorEnum } from './../enums/visual-scripting-ipc-error.enum';
import { ErrorInterface } from './../types/error.interface';
import { MessageInterface } from './../types/message.interface';
import { VisualScriptingIpcChannelsMethodEnum } from './../enums/visual-scripting-ipc-channels-method.enum';
import { VisualScriptingIpcChannelsEnum } from "../enums/visual-scripting-ipc-channels.enum";

export class VisualScriptingIpcDecorator {
    private static readonly IPC_DECORATOR = "IPC_DECORATOR";

    private ipc: any;
    private channel: VisualScriptingIpcChannelsEnum;
    private channelListen: boolean;
    private handlers: {[name: string]: (m: MessageInterface<any>) => Promise<any>};
    private messages: {[id: string]: {
        allowEmptyReply: boolean,
        resolve: (r: any) => void,
        reject: (e: any) => void,
    }}
    private uuidGenerator: () => string;

    constructor(ipc: any, channel: VisualScriptingIpcChannelsEnum, uuidGenerator: () => string)
    {
        this.ipc = ipc;
        this.channel = channel;
        this.channelListen = false;
        this.handlers = {};
        this.messages = {};
        this.uuidGenerator = uuidGenerator;
    }

    addHandler<ParameterType = void, ResultType = void>(method: VisualScriptingIpcChannelsMethodEnum, handler: (m: MessageInterface<ParameterType>) => Promise<ResultType>): void
    {
        if (this.channelListen) {
            throw {
                raiseBy: VisualScriptingIpcDecorator.IPC_DECORATOR,
                code: VisualScriptingIpcErrorEnum.VisualScriptingIpcRunning.code,
                what: VisualScriptingIpcErrorEnum.VisualScriptingIpcRunning.what,
            } as ErrorInterface;
        }

        if (this.handlers[method]) {
            throw {
                raiseBy: VisualScriptingIpcDecorator.IPC_DECORATOR,
                code: VisualScriptingIpcErrorEnum.VisualScriptingIpcHandlerExist.code,
                what: VisualScriptingIpcErrorEnum.VisualScriptingIpcHandlerExist.what,
                annotations: {
                    method
                }
            } as ErrorInterface;
        }

        this.handlers[method] = handler;
    }

    private handle(event: any, message: any): Promise<void>
    {
        if (message.method) {
            return this.handleMessage(event, message);
        } else {
            return this.handleResult(event, message);
        }
    }

    private async handleMessage(event: any, message: MessageInterface<any>): Promise<void>
    {
        try {
            if (!this.handlers[message.method]) {
                throw {
                    raiseBy: VisualScriptingIpcDecorator.IPC_DECORATOR,
                    code: VisualScriptingIpcErrorEnum.VisualScriptingIpcNoHandlerForMessage.code,
                    what: VisualScriptingIpcErrorEnum.VisualScriptingIpcNoHandlerForMessage.what,
                } as ErrorInterface;
            }

            let result = await this.handlers[message.method](message);
            event.reply(this.channel, {
                id: message.id,
                result
            } as MessageResultInterface);
        } catch(exception: any) {
            event.reply(this.channel, {
                id: message.id,
                error: Object.assign({}, exception, {
                    annotations: Object.assign({}, exception.annotations || {}, {
                        id: message.id,
                        method: message.method
                    })
                })
            } as MessageResultInterface);
        }
    }

    private async handleResult(event: any, messageResult: MessageResultInterface<any>): Promise<void>
    {
        if (messageResult.error) {
            this.rejectMessage(messageResult.id, messageResult.error);
        }

        if (this.messages[messageResult.id]) {
            if (!messageResult.result && !this.messages[messageResult.id].allowEmptyReply) {
                this.rejectMessage(messageResult.id, {
                    raiseBy: VisualScriptingIpcDecorator.IPC_DECORATOR,
                    code: VisualScriptingIpcErrorEnum.VisualScriptingIpcMessageEmptyReply.code,
                    what: VisualScriptingIpcErrorEnum.VisualScriptingIpcMessageEmptyReply.what,
                });
            } else {
                this.messages[messageResult.id].resolve(messageResult.result);
                delete this.messages[messageResult.id];
            }
        }
    }

    private rejectMessage(id: string, exception: ErrorInterface)
    {
        if (this.messages[id]) {
            this.messages[id].reject(exception);
            delete this.messages[id];
        }
    }

    send<ParameterType, ResultType>(method: VisualScriptingIpcChannelsMethodEnum, parameter: ParameterType, allowEmptyReply: boolean = true, timeout: number = 300_000): Promise<ResultType>
    {
        if (!this.channelListen) {
            throw {
                raiseBy: VisualScriptingIpcDecorator.IPC_DECORATOR,
                code: VisualScriptingIpcErrorEnum.VisualScriptingIpcNotReady.code,
                what: VisualScriptingIpcErrorEnum.VisualScriptingIpcNotReady.what,
            } as ErrorInterface;
        }

        let id = this.uuidGenerator();
        return new Promise<ResultType>((resolve, reject) => {
            this.messages[id] = {
                allowEmptyReply,
                resolve,
                reject
            }

            setTimeout(this.rejectMessage.bind(this, id, {
                raiseBy: VisualScriptingIpcDecorator.IPC_DECORATOR,
                code: VisualScriptingIpcErrorEnum.VisualScriptingIpcMessageTimeout.code,
                what: VisualScriptingIpcErrorEnum.VisualScriptingIpcMessageTimeout.what,
                annotations: {
                    timeout
                }
            } as ErrorInterface), timeout);

            this.ipc.send(this.channel, {
                id,
                method,
                parameters: parameter
            } as MessageInterface<ParameterType>);
        })
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
