import { Injectable } from '@angular/core';
import { VisualScriptingEditorDriverInterface } from '../interfaces/visual-scripting-editor-driver.interface';

@Injectable({
  providedIn: 'root'
})
export class VisualScriptingEditorDriverService {
  private driver: VisualScriptingEditorDriverInterface | null;

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

  hasDriver(): boolean
  {
    return this.driver != null;
  }

}
