import { RegularFileInterface } from './regular-file.interface';
import { DirectoryInterface } from "./directory.interface";
import { VersionableInterface } from './versionable.interface';

export interface ProjectInterface extends VersionableInterface {
  folder?: DirectoryInterface,
  name: string,
  plugins: {
    directory: DirectoryInterface,
    enable: boolean,
  }[],
  nodes: {[k: string]: RegularFileInterface},
  modules: {[k: string]: RegularFileInterface},
  lifelines: {[k: string]: RegularFileInterface},

}
