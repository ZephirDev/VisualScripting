import { ElectronService } from 'ngx-electron';
import * as uuid from 'uuid';
import {
  DirectoryInterface,
  ProjectInterface,
  RegularFileInterface,
  VisualScriptingIpcChannelsEnum,
  VisualScriptingIpcChannelsMethodEnum,
  IpcDecorator,
  AbstractFileInterface,
  CreateDirectoryInterface,
  NodeInterface,
  CreateNodeInterface,
} from 'visual-scripting-common';
import { VisualScriptingEditorProjectInterface } from 'visual-scripting-editor';
import {VisualScriptingOpentracingService} from "visual-scripting-opentracing";

export class VisualScriptingElectronProjectService implements VisualScriptingEditorProjectInterface {
  private ipcDecorator: IpcDecorator;

  constructor(electronService: ElectronService, opentracingService: VisualScriptingOpentracingService)
  {
    this.ipcDecorator = new IpcDecorator(electronService.ipcRenderer, VisualScriptingIpcChannelsEnum.PROJECT);
    this.ipcDecorator.listen();
  }

  create(directory: DirectoryInterface): Promise<ProjectInterface>
  {
    return this.ipcDecorator.send<DirectoryInterface, ProjectInterface>(VisualScriptingIpcChannelsMethodEnum.PROJECT_CREATE, directory, {
      notNull: true
    }).then(r => r!);
  }

  load(file: RegularFileInterface): Promise<ProjectInterface>
  {
    return this.ipcDecorator.send<RegularFileInterface, ProjectInterface>(VisualScriptingIpcChannelsMethodEnum.PROJECT_LOAD, file, {
      notNull: true
    }).then(r => r!);
  }

  listNodesOf(directories: DirectoryInterface[]): Promise<AbstractFileInterface[]>
  {
    return this.ipcDecorator.send<DirectoryInterface[], AbstractFileInterface[]>(VisualScriptingIpcChannelsMethodEnum.PROJECT_NODES_LIST_OF, directories, {
      notNull: true
    }).then(r => r!);
  }

  createNodesDirectoryOf(directories: DirectoryInterface[], name: string): Promise<DirectoryInterface>
  {
    return this.ipcDecorator.send<CreateDirectoryInterface, DirectoryInterface>(VisualScriptingIpcChannelsMethodEnum.PROJECT_NODES_CREATE_DIRECTORY, {
      directories,
      name,
    }, {
      notNull: true
    }).then(r => r!);
  }

  createNode(directories: DirectoryInterface[], name: string): Promise<NodeInterface>
  {
    return this.ipcDecorator.send<CreateNodeInterface, NodeInterface>(VisualScriptingIpcChannelsMethodEnum.PROJECT_NODES_CREATE_NODE, {
      parents: directories,
      name,
    }, {
      notNull: true
    }).then(r => r!);
  }
}
