import { ElectronService } from 'ngx-electron';
import * as uuid from 'uuid';
import {
  DirectoryInterface,
  ProjectInterface,
  VisualScriptingIpcChannelsEnum,
  VisualScriptingIpcChannelsMethodEnum,
  VisualScriptingIpcDecorator,
} from 'visual-scripting-common';
import { VisualScriptingEditorProjectInterface } from 'visual-scripting-editor';

export class VisualScriptingElectronProjectService implements VisualScriptingEditorProjectInterface {
  private ipcDecorator: VisualScriptingIpcDecorator;

  constructor(electronService: ElectronService)
  {
    this.ipcDecorator = new VisualScriptingIpcDecorator(electronService.ipcRenderer, VisualScriptingIpcChannelsEnum.PROJECT, uuid.v4);
    this.ipcDecorator.listen();
  }

  create(directory: DirectoryInterface): Promise<ProjectInterface>
  {
    return this.ipcDecorator.send<DirectoryInterface, ProjectInterface>(VisualScriptingIpcChannelsMethodEnum.PROJECT_CREATE, directory, false);
  }
}
