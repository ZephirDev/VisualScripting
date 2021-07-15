import { VisualScriptingEditorSettingsInterface } from './visual-scripting-editor-settings.interface';
import { VisualScriptingEditorStorageInterface } from './visual-scripting-editor-storage.interface';

export interface VisualScriptingEditorDriverInterface {
  getStorage(): VisualScriptingEditorStorageInterface;
  getSettings(): VisualScriptingEditorSettingsInterface;
}
