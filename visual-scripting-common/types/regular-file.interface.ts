import { AbstractFileInterface } from "./abstract-file.interface";

export interface RegularFileInterface extends AbstractFileInterface {
    filename: string,
    extension: string,
}