import {ExecutionContext} from "../executions/execution.context";

export class MessageHelper {
    static of()

    context: ExecutionContext;

    constructor() {
        this.context = new ExecutionContext();
    }
}