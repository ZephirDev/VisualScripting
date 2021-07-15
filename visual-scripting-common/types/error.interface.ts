export interface ErrorInterface {
    raiseBy: string,
    code: number,
    what?: string,
    annotations?: {[k:string]: any},
}