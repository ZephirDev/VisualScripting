import { ElectronService } from 'ngx-electron';
import { VisualScriptingEditorSettingsInterface } from 'visual-scripting-editor';

import { Observable, Observer } from 'rxjs';
import {
  DirectoryInterface,
  AbstractFileInterface,
  OpentracingOptionsInterface,
  IpcDecorator,
  VisualScriptingIpcChannelsEnum,
  VisualScriptingIpcChannelsMethodEnum,
} from 'visual-scripting-common';
import * as uuid from "uuid";
import {VisualScriptingOpentracingService} from "visual-scripting-opentracing";

export class VisualScriptingElectronSettingsService implements VisualScriptingEditorSettingsInterface {
  private ipcDecorator: IpcDecorator;

  constructor(electronService: ElectronService, opentracingService: VisualScriptingOpentracingService)
  {
    this.ipcDecorator = new IpcDecorator(electronService.ipcRenderer, VisualScriptingIpcChannelsEnum.OPTIONS);
    this.ipcDecorator.listen();
  }

  async getOpentracingSettings(): Promise<OpentracingOptionsInterface|null>
  {
    return this.ipcDecorator.send<null, OpentracingOptionsInterface|null>(VisualScriptingIpcChannelsMethodEnum.OPTIONS_GET_OPENTRACING, null);
  }

}
