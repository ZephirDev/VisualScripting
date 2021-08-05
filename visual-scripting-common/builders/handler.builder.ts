import {HandlerInterface} from "../types/handler.interface";
import {ExecutionContext} from "../executions/execution.context";

export class HandlerBuilder {

    static newMessageHandler<ParameterType, ResultType>(fn: (p: ParameterType|null) => Promise<ResultType>): HandlerInterface<void>
    {
        return {
            async handle(context: ExecutionContext): Promise<void> {
                if (!context.hasMessage()) {
                    return;
                }

                try {
                    let r = await fn(context.getMessage<ParameterType>().parameters || null);
                    context.addResult<ResultType>(r);
                } catch (exception) {
                    context.addError(exception);
                }
            }
        }
    }
}