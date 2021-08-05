import {PriorityEventInterface} from "../types/priority-event.interface";
import {HandlerInterface} from "../types/handler.interface";

export interface PriorityEventHandlersInterface {
    priorityEvent: PriorityEventInterface,
    handlers: HandlerInterface<void>[]
}