import {RegularFileInterface} from "./regular-file.interface";
import {VersionableInterface} from "./versionable.interface";

export interface NodeInterface extends VersionableInterface {
    file?: RegularFileInterface,
    namespace: string,
    name: string,
}