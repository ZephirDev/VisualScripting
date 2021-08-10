import {NodeAttributeInterface} from "./node-attribute.interface";

export interface NodeMethodInterface {
    name: string|{pattern: string},
    result?: NodeAttributeInterface,
    parameters: NodeAttributeInterface[],
}