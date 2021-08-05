import {ExecutionContext} from "../executions/execution.context";
import {MessageInterface} from "../types/message.interface";
import * as uuid from 'uuid';
import {MessageResultInterface} from "../types/message-result.interface";
import {ErrorInterface} from "../types/error.interface";

export class ExecutionContextBuilder {
    static newBuilder(ctx?: ExecutionContext): ExecutionContextBuilder
    {
        return new ExecutionContextBuilder(ctx);
    }

    ctx: ExecutionContext;

    constructor(ctx?: ExecutionContext) {
        if (ctx) {
            this.ctx = ctx.clone();
        } else {
            this.ctx = new ExecutionContext();
        }
    }

    addMessage(message: MessageInterface): ExecutionContextBuilder
    {
        this.ctx.attach({
            message,
        });
        return this;
    }

    addMessageOfParameter<Type>(method: string, parameters: Type): ExecutionContextBuilder
    {
        this.ctx.attach({
            message: {
                id: uuid.v4(),
                method,
                parameters
            }
        });
        return this;
    }

    addMessageResult(messageResult: MessageResultInterface): ExecutionContextBuilder
    {
        this.ctx.attach({
            messageResult,
        });
        return this;
    }

    addMessageResultOfResult<ResultType>(message: MessageInterface, result: ResultType): ExecutionContextBuilder
    {
        this.ctx.attach({
            messageResult: {
                id: message.id,
                result,
            },
        });
        return this;
    }

    addResult<ResultType>(result: ResultType): ExecutionContextBuilder
    {
        this.ctx.addResult<ResultType>(result);
        return this;
    }

    addMessageResultOfError(message: MessageInterface, error: ErrorInterface): ExecutionContextBuilder
    {
        this.ctx.attach({
            messageResult: {
                id: message.id,
                error,
            },
        });
        return this;
    }

    addError(error: ErrorInterface): ExecutionContextBuilder
    {
        this.ctx.addError(error);
        return this;
    }

    build(): ExecutionContext
    {
        return this.ctx.clone();
    }
}