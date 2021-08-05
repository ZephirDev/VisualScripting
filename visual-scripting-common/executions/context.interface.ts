import {OpentracingSpanDecoratorInterface} from "../decorators/opentracing-span-decorator.interface";
import {MessageResultInterface} from "../types/message-result.interface";
import {MessageInterface} from "../types/message.interface";

export interface ContextInterface {
    opentracingSpan?: OpentracingSpanDecoratorInterface;
    message?: MessageInterface<any>;
    messageResult?: MessageResultInterface<any>;
}