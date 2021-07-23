import { DirectoryInterface, ProjectInterface, RegularFileInterface } from 'visual-scripting-common';
export interface VisualScriptingEditorProjectInterface {
  create(directory: DirectoryInterface): Promise<ProjectInterface>;
  load(file: RegularFileInterface): Promise<ProjectInterface>;
}
