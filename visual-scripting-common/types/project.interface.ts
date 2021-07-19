import { DirectoryInterface } from "./directory.interface";
import { VersionableInterface } from './versionable.interface';

export interface ProjectInterface extends VersionableInterface {
  folder?: DirectoryInterface,
  name: string,
}
