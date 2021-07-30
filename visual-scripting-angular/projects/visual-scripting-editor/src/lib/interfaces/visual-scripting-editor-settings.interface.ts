import { Observable } from 'rxjs';
import { OpentracingOptionsInterface } from 'visual-scripting-common';

export interface VisualScriptingEditorSettingsInterface {
  getOpentracingSettings(): Promise<OpentracingOptionsInterface|null>;
}
