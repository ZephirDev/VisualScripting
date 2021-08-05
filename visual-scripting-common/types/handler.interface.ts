import {ExecutionContext} from "../executions/execution.context";

export interface HandlerInterface<Result> {
    handle(context: ExecutionContext): Promise<Result>;
}