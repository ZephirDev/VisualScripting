import { ElectronService } from 'ngx-electron';
import { VisualScriptingEditorSettingsInterface } from 'visual-scripting-editor';

import { Observable, Observer } from 'rxjs';
import { DirectoryInterface, AbstractFileInterface } from 'visual-scripting-common';

export class VisualScriptingElectronSettingsService implements VisualScriptingEditorSettingsInterface {

  projectObservable : Observable<AbstractFileInterface|null>;
  projectObserver?: Observer<AbstractFileInterface|null>;

  constructor(electronService: ElectronService)
  {
    this.projectObservable = new Observable<AbstractFileInterface|null>((observer) => {
      this.projectObserver = observer;
      this.projectObserver!.next(null);
    });
  }

  getProject(): Observable<AbstractFileInterface|null>
  {
    return this.projectObservable;
  }

}
