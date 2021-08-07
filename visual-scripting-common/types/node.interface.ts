import {RegularFileInterface} from "./regular-file.interface";
import {VersionableInterface} from "./versionable.interface";
import {NodeAttributeInterface} from "./node-attribute.interface";

export interface NodeInterface extends VersionableInterface {
    file?: RegularFileInterface,
    namespace: string,
    name: string,
    languages: string[],
    attributes: NodeAttributeInterface[],
}