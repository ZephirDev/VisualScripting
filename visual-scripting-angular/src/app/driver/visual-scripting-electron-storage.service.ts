import { ElectronService } from 'ngx-electron';
import { VisualScriptingEditorStorageInterface } from 'visual-scripting-editor';
import { IpcDecorator, VisualScriptingIpcChannelsEnum, VisualScriptingIpcChannelsMethodEnum, DirectoryInterface } from 'visual-scripting-common';
import * as uuid from 'uuid';
import {VisualScriptingOpentracingService} from "visual-scripting-opentracing";

export class VisualScriptingElectronStorageService implements VisualScriptingEditorStorageInterface {
  private ipcDecorator: IpcDecorator;

  constructor(electronService: ElectronService, opentracingService: VisualScriptingOpentracingService)
  {
    this.ipcDecorator = new IpcDecorator(electronService.ipcRenderer, VisualScriptingIpcChannelsEnum.FILE_SYSTEM);
    this.ipcDecorator.listen();
  }

  getLastOpennedDirectory(): Promise<DirectoryInterface[]>
  {
    return this.ipcDecorator.send<null, DirectoryInterface[]>(VisualScriptingIpcChannelsMethodEnum.FILE_SYSTEM_LAST_OPENNED_DIR, null, {
      notNull: true,
    }).then(r => r!);
  }

  async listFilesOf(folders: DirectoryInterface[]): Promise<DirectoryInterface[]>
  {
    return this.ipcDecorator.send<DirectoryInterface[], DirectoryInterface[]>(VisualScriptingIpcChannelsMethodEnum.FILE_SYSTEM_LIST, folders, {
      notNull: true,
    }).then(r => r!);
  }
}
