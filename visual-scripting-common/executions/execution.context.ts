import {ContextInterface} from "./context.interface";
import {ErrorInterface} from "../types/error.interface";
import {VisualScriptingIpcRaiseByEnum} from "../enums/visual-scripting-ipc-raise-by.enum";
import {VisualScriptingIpcErrorEnum} from "../enums/visual-scripting-ipc-error.enum";
import {OpentracingSpanDecoratorInterface} from "../decorators/opentracing-span-decorator.interface";
import {MessageResultInterface} from "../types/message-result.interface";
import {MessageInterface} from "../types/message.interface";
import {ErrorBuilder} from "../builders/error.builder";

export class ExecutionContext {
    private static readonly CLASS_NAME = 'ExecutionContext';

    context: ContextInterface;

    constructor(context: ContextInterface = {})
    {
        this.context = Object.assign({}, context);
    }

    attach(context: ContextInterface)
    {
        this.context = Object.assign({}, this.context, context);
    }

    create(context: ContextInterface): ExecutionContext
    {
        let executionContext = new ExecutionContext();
        executionContext.attach(this.context);
        executionContext.attach(context);
        return executionContext;
    }

    private guardNull(name: keyof ContextInterface)
    {
        if (null === this.context[name] || undefined === this.context[name]) {
            throw ErrorBuilder.For(VisualScriptingIpcRaiseByEnum.COMMON)
                .klass(ExecutionContext.CLASS_NAME)
                .attribute('context' + name)
                .nullPointer();
        }
    }

    hasOpentracingSpan(): boolean
    {
        return null != this.context.opentracingSpan;
    }

    getOpentracingSpan(): OpentracingSpanDecoratorInterface
    {
        this.guardNull("opentracingSpan");
        return this.context.opentracingSpan!;
    }

    hasMessage(): boolean
    {
        return null != this.context.message;
    }

    getMessage<Type = any>(): MessageInterface<Type>
    {
        this.guardNull("message");
        return this.context.message!;
    }

    hasMessageResult(): boolean
    {
        return null != this.context.messageResult;
    }

    getMessageResult<Type = any>(): MessageResultInterface<Type>
    {
        this.guardNull("messageResult");
        return this.context.messageResult!;
    }

    addResult<Type = any>(result: Type): void
    {
        this.context.messageResult = {
            id: this.getMessage().id,
            result,
        }
    }

    addError(error: ErrorInterface)
    {
        if (!this.hasMessage()) {

        }
        this.context.messageResult = {
            id: this.getMessage().id,
            error,
        }
    }

    static Clone(ctx: ContextInterface): ContextInterface
    {
        let copy: ContextInterface = {};

        if (ctx.opentracingSpan) {
            copy.opentracingSpan = ctx.opentracingSpan;
        }

        if (ctx.message) {
            copy.message = JSON.parse(JSON.stringify(ctx.message)) as MessageInterface;
        }

        if (ctx.messageResult) {
            copy.messageResult = JSON.parse(JSON.stringify(ctx.messageResult)) as MessageResultInterface;
        }

        return copy;
    }

    clone(): ExecutionContext
    {
        return new ExecutionContext(ExecutionContext.Clone(this.context));
    }
}