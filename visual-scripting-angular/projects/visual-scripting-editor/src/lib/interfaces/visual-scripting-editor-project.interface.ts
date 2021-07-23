import { DirectoryInterface, ProjectInterface, RegularFileInterface, AbstractFileInterface } from 'visual-scripting-common';
export interface VisualScriptingEditorProjectInterface {
  create(directory: DirectoryInterface): Promise<ProjectInterface>;
  load(file: RegularFileInterface): Promise<ProjectInterface>;

  listNodesOf(directory: DirectoryInterface[]): Promise<AbstractFileInterface[]>;
}
