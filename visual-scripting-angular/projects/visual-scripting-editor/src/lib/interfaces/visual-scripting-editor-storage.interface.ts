import { DirectoryInterface, AbstractFileInterface } from 'visual-scripting-common';

export interface VisualScriptingEditorStorageInterface {
  getLastOpennedDirectory(): Promise<DirectoryInterface[]>;
  listFilesOf(folders: DirectoryInterface[]): Promise<DirectoryInterface[]>;
}
