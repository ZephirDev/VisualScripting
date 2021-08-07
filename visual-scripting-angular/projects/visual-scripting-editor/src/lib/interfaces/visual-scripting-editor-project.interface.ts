import { DirectoryInterface, ProjectInterface, RegularFileInterface, AbstractFileInterface, NodeInterface } from 'visual-scripting-common';
export interface VisualScriptingEditorProjectInterface {
  create(directory: DirectoryInterface): Promise<ProjectInterface>;
  load(file: RegularFileInterface): Promise<ProjectInterface>;

  listNodesOf(directories: DirectoryInterface[]): Promise<AbstractFileInterface[]>;
  createNodesDirectoryOf(directories: DirectoryInterface[], name: string): Promise<DirectoryInterface>;
  createNode(directories: DirectoryInterface[], name: string): Promise<NodeInterface>;
  loadNode(file: RegularFileInterface): Promise<NodeInterface>;
}
