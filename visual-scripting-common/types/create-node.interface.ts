import {DirectoryInterface} from "./directory.interface";

export interface CreateNodeInterface {
    parents: DirectoryInterface[],
    name: string,
}