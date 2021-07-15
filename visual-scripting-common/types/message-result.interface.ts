import { ErrorInterface } from './error.interface';

export interface MessageResultInterface<ResultType = void> {
    id: string,
    result?: ResultType
    error?: ErrorInterface
}
