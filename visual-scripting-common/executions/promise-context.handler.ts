import {ExecutionContext} from "./execution.context";
import {ErrorInterface} from "../types/error.interface";
import {PromiseStatusEnum} from "../enums/promise-status.enum";

export class PromiseContextHandler
{
    static async newPromiseHandler(): Promise<PromiseContextHandler>
    {
        let promise: Promise<ExecutionContext>|null = null;
        return new Promise(resolveHandler => {
            promise = new Promise<ExecutionContext>((resolve, reject) => {
                resolveHandler({
                    resolve,
                    reject,
                });
            });
        }).then((r: any) => {
            return new PromiseContextHandler(promise!, r.resolve, r.reject)
        })
    }

    private promise: Promise<ExecutionContext>;
    private resolveCallback: (ctx: ExecutionContext) => void;
    private rejectCallback: (err: ErrorInterface) => void;
    private status: PromiseStatusEnum;

    constructor(promise: Promise<ExecutionContext>, resolveCallback: (ctx: ExecutionContext) => void, rejectCallback: (err: ErrorInterface) => void) {
        this.promise = promise;
        this.resolveCallback = resolveCallback;
        this.rejectCallback = rejectCallback;
        this.status = PromiseStatusEnum.RUNNING;
    }

    isRunning(): boolean
    {
        return this.status === PromiseStatusEnum.RUNNING;
    }

    isResolved(): boolean
    {
        return this.status === PromiseStatusEnum.RESOLVED;
    }

    isRejected(): boolean
    {
        return this.status === PromiseStatusEnum.REJECTED;
    }

    resolve(ctx: ExecutionContext): void
    {
        if (this.isRunning()) {
            this.status = PromiseStatusEnum.RESOLVED;
            this.resolveCallback(ctx);
        }
    }

    reject(error: ErrorInterface): void
    {
        if (this.isRunning()) {
            this.status = PromiseStatusEnum.REJECTED;
            this.reject(error);
        }
    }

    getPromise(): Promise<ExecutionContext>
    {
        return this.promise;
    }
}