import {NodeMethodInterface} from "./node-method.interface";
import {VisibilityEnum} from "../enums/visibility.enum";

export interface NodeAttributeInterface {
    name: string,
    type: string,
    visibility: VisibilityEnum,
    methods: {
        getter?: NodeMethodInterface,
        setter?: NodeMethodInterface,
    },
}