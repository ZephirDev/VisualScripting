import { DirectoryInterface, ProjectInterface } from 'visual-scripting-common';
export interface VisualScriptingEditorProjectInterface {
  create(directory: DirectoryInterface): Promise<ProjectInterface>;
}
