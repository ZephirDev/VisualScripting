import { DirectoryInterface, ProjectInterface, RegularFileInterface, AbstractFileInterface } from 'visual-scripting-common';
export interface VisualScriptingEditorProjectInterface {
  create(directory: DirectoryInterface): Promise<ProjectInterface>;
  load(file: RegularFileInterface): Promise<ProjectInterface>;

  listNodesOf(directories: DirectoryInterface[]): Promise<AbstractFileInterface[]>;
  createNodesDirectoryOf(directories: DirectoryInterface[], name: string): Promise<DirectoryInterface>;
}
