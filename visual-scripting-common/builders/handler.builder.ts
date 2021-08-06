import {HandlerInterface} from "../types/handler.interface";
import {ExecutionContext} from "../executions/execution.context";
import {ErrorBuilder} from "./error.builder";
import {VisualScriptingIpcRaiseByEnum} from "../enums/visual-scripting-ipc-raise-by.enum";

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
                    if (exception.what) {
                        context.addError(exception);
                    } else {
                        context.addError(ErrorBuilder.For(VisualScriptingIpcRaiseByEnum.COMMON)
                            .build({
                                code: 0,
                                what: exception.toString(),
                            }));
                    }
                }
            }
        }
    }
}