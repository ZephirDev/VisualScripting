import { FileTypeEnum } from "../enums/file-type.enum";

export interface AbstractFileInterface {
    type: FileTypeEnum,
    path: string,
    dirname?: string,
    name: string,
    mode: number,
}