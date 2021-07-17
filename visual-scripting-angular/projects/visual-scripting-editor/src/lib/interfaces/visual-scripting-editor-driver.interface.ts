import { VisualScriptingEditorProjectInterface } from './visual-scripting-editor-project.interface';
import { VisualScriptingEditorSettingsInterface } from './visual-scripting-editor-settings.interface';
import { VisualScriptingEditorStorageInterface } from './visual-scripting-editor-storage.interface';

export interface VisualScriptingEditorDriverInterface {
  getStorage(): VisualScriptingEditorStorageInterface;
  getSettings(): VisualScriptingEditorSettingsInterface;
  getProject(): VisualScriptingEditorProjectInterface;
}
