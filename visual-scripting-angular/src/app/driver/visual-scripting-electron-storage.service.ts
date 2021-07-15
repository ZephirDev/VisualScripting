import { ElectronService } from 'ngx-electron';
import { VisualScriptingEditorStorageInterface } from 'visual-scripting-editor';
import { VisualScriptingIpcDecorator, VisualScriptingIpcChannelsEnum, VisualScriptingIpcChannelsMethodEnum, DirectoryInterface } from 'visual-scripting-common';
import * as uuid from 'uuid';

export class VisualScriptingElectronStorageService implements VisualScriptingEditorStorageInterface {
  private ipcDecorator: VisualScriptingIpcDecorator;

  constructor(electronService: ElectronService)
  {
    this.ipcDecorator = new VisualScriptingIpcDecorator(electronService.ipcRenderer, VisualScriptingIpcChannelsEnum.FILE_SYSTEM, uuid.v4);
    this.ipcDecorator.listen();
  }

  getLastOpennedDirectory(): Promise<DirectoryInterface[]>
  {
    return this.ipcDecorator.send<null, DirectoryInterface[]>(VisualScriptingIpcChannelsMethodEnum.FILE_SYSTEM_LAST_OPENNED_DIR, null, true);
  }

  async listFilesOf(folders: DirectoryInterface[]): Promise<DirectoryInterface[]>
  {
    return this.ipcDecorator.send<DirectoryInterface[], DirectoryInterface[]>(VisualScriptingIpcChannelsMethodEnum.FILE_SYSTEM_LIST, folders, true);
  }
}
