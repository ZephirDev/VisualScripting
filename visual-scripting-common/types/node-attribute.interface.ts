import {NodeMethodInterface} from "./node-method.interface";

export interface NodeAttributeInterface {
    name: string,
    type: string,
    methods: {
        getter?: NodeMethodInterface,
        setter?: NodeMethodInterface,
    },
}