import { Observable } from 'rxjs';
import { DirectoryInterface, AbstractFileInterface } from 'visual-scripting-common';

export interface VisualScriptingEditorSettingsInterface {
  getProject(): Observable<AbstractFileInterface|null>;
}
