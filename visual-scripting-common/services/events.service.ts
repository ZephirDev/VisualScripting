import {ErrorBuilder} from "../builders/error.builder";
import {VisualScriptingIpcRaiseByEnum} from "../enums/visual-scripting-ipc-raise-by.enum";
import {EventsEnum} from "../enums/events.enum";
import {ExecutionContext} from "../executions/execution.context";
import {HandlerInterface} from "../types/handler.interface";
import {PriorityEventInterface} from "../types/priority-event.interface";
import {PriorityEventHandlersInterface} from "../types/priority-event-handlers.interface";

export class EventsService {
    private static readonly CLASS_NAME = 'EventsService';
    private static INSTANCE: EventsService|null = null;
    static readonly MIN_PRIORITIES = -100_000;
    static readonly MAX_PRIORITIES = 100_000;

    public static Init()
    {
        if (!EventsService.INSTANCE) {
            EventsService.INSTANCE = new EventsService();
        }
    }

    public static GetInstance(): EventsService
    {
        if (!EventsService.INSTANCE) {
            throw ErrorBuilder.For(VisualScriptingIpcRaiseByEnum.COMMON)
                .klass('EventsService')
                .attribute('INSTANCE')
                .nullPointer();
        }
        return EventsService.INSTANCE!;
    }

    private handlers: {[k: string]: HandlerInterface<void>}[][];

    constructor()
    {
        this.handlers = [];
        for (let i = 0; i < (EventsService.MIN_PRIORITIES * -1) + EventsService.MAX_PRIORITIES + 3; i++) {
            this.handlers.push([]);
        }
    }

    fire(event: EventsEnum, context: ExecutionContext, callback?: {handler: HandlerInterface<void>, priority: number}[]): Promise<void>
    {
        if (callback) {
            callback = callback.sort((left, right) => {
                if (left.priority < right.priority) {
                    return -1;
                } else if (left.priority == right.priority) {
                    return 0;
                } else {
                    return 1;
                }
            });
        }

        let callbackIndex = 0;
        let promise: Promise<void> = Promise.resolve();
        for (let i = 0; i < this.handlers.length; i++) {
            promise = promise.then(() => {
                let promises: Promise<void>[] = [];

                while (callback && callbackIndex < callback.length && i == callback[callbackIndex].priority) {
                    promises.push(callback[callbackIndex].handler.handle(context));
                    callbackIndex++;
                }

                for (let handler of this.handlers[i]) {
                    if (handler[event]) {
                        promises.push(handler[event].handle(context));
                    }
                }
                
                return Promise.all(promises).then(() => {});
            });
        }
        return promise;
    }

    addHandlers(priority: number, handlers: {[k: string]: HandlerInterface<void>}): () => void
    {
        if (priority < EventsService.MIN_PRIORITIES || priority > EventsService.MAX_PRIORITIES) {
            throw ErrorBuilder.For(VisualScriptingIpcRaiseByEnum.COMMON)
                .klass(EventsService.CLASS_NAME)
                .addAnnotation("priority", {
                    max: EventsService.MAX_PRIORITIES,
                    min: EventsService.MIN_PRIORITIES
                })
                .addAnnotation("event", {
                    types: Object.keys(handlers)
                })
                .invalidNumberValue(priority)
        }

        let truePriority = priority + EventsService.MAX_PRIORITIES * -1;

        if (!this.handlers[truePriority].includes(handlers)) {
            this.handlers[truePriority].push(handlers);
        }

        return () => {
            if (this.handlers[truePriority].includes(handlers)) {
                this.handlers[truePriority] = this.handlers[truePriority].filter(h => h === handlers);
            }
        };
    }

    addHandler(priority: number, event: EventsEnum, handler: HandlerInterface<void>): () => void
    {
        let handlers: {[k: string]: HandlerInterface<void>} = {};
        handlers[event] = handler;
        return this.addHandlers(priority, handlers);
    }

    addHandlerFor(priorityEvent: PriorityEventInterface, handler: HandlerInterface<void>): () => void
    {
        return this.addHandler(priorityEvent.priority, priorityEvent.event, handler);
    }

    addHandlerFromStruct(list: PriorityEventHandlersInterface[]): () => void
    {
        let fn = () => {};
        for (let item of list) {
            for (let handler of item.handlers) {
                fn = ((old: () => void, remover: () => void) => {
                    old();
                    remover();
                }).bind(null, fn, this.addHandlerFor(item.priorityEvent, handler));
            }
        }
        return fn;
    }
}