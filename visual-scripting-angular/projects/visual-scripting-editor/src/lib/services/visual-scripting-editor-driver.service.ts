import { Injectable } from '@angular/core';
import { VisualScriptingEditorDriverInterface } from '../interfaces/visual-scripting-editor-driver.interface';

@Injectable()
export class VisualScriptingEditorDriverService {

  driver: VisualScriptingEditorDriverInterface | null;

  constructor() {
    this.driver = null;
  }

  getDriver(): VisualScriptingEditorDriverInterface
  {
    return this.driver!;
  }

  setDriver(driver: VisualScriptingEditorDriverInterface)
  {
    this.driver = driver;
  }

}
