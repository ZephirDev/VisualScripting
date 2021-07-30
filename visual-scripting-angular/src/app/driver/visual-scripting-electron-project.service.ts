import { ElectronService } from 'ngx-electron';
import * as uuid from 'uuid';
import {
  DirectoryInterface,
  ProjectInterface,
  RegularFileInterface,
  VisualScriptingIpcChannelsEnum,
  VisualScriptingIpcChannelsMethodEnum,
  VisualScriptingIpcDecorator,
  AbstractFileInterface,
  CreateDirectoryInterface,
} from 'visual-scripting-common';
import { VisualScriptingEditorProjectInterface } from 'visual-scripting-editor';
import {VisualScriptingOpentracingService} from "visual-scripting-opentracing";

export class VisualScriptingElectronProjectService implements VisualScriptingEditorProjectInterface {
  private ipcDecorator: VisualScriptingIpcDecorator;

  constructor(electronService: ElectronService, opentracingService: VisualScriptingOpentracingService)
  {
    this.ipcDecorator = new VisualScriptingIpcDecorator(electronService.ipcRenderer, VisualScriptingIpcChannelsEnum.PROJECT, uuid.v4);
    this.ipcDecorator.addEventHandlers(opentracingService.getIpcEventHandlers());
    this.ipcDecorator.listen();
  }

  create(directory: DirectoryInterface): Promise<ProjectInterface>
  {
    return this.ipcDecorator.send<DirectoryInterface, ProjectInterface>(VisualScriptingIpcChannelsMethodEnum.PROJECT_CREATE, directory, false);
  }

  load(file: RegularFileInterface): Promise<ProjectInterface>
  {
    return this.ipcDecorator.send<RegularFileInterface, ProjectInterface>(VisualScriptingIpcChannelsMethodEnum.PROJECT_LOAD, file, false);
  }

  listNodesOf(directories: DirectoryInterface[]): Promise<AbstractFileInterface[]>
  {
    return this.ipcDecorator.send<DirectoryInterface[], AbstractFileInterface[]>(VisualScriptingIpcChannelsMethodEnum.PROJECT_NODES_LIST_OF, directories, false);
  }

  createNodesDirectoryOf(directories: DirectoryInterface[], name: string): Promise<DirectoryInterface>
  {
    return this.ipcDecorator.send<CreateDirectoryInterface, DirectoryInterface>(VisualScriptingIpcChannelsMethodEnum.PROJECT_NODES_CREATE_DIRECTORY, {
      directories,
      name,
    }, false);
  }
}
