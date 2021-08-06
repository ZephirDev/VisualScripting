import { CreateDirectoryInterface } from './../common/types/create-direotry.interface';
import * as uuid from 'uuid';

import {
    DirectoryInterface,
    MessageInterface,
    ProjectInterface,
    VisualScriptingIpcChannelsEnum,
    VisualScriptingIpcChannelsMethodEnum,
    IpcDecorator, HandlerBuilder,
    CreateNodeInterface, NodeInterface,
} from './../common/public-api';
import { AbstractFileInterface } from './../common/types/abstract-file.interface';
import { RegularFileInterface } from './../common/types/regular-file.interface';
import { ProjectServiceInstance } from './../services/project.service';

export class ProjectIpcChannel extends IpcDecorator {
    private project: ProjectInterface|null = null;

    constructor(ipc: any)
    {
        super(ipc, VisualScriptingIpcChannelsEnum.PROJECT);
        this.addHandler(VisualScriptingIpcChannelsMethodEnum.PROJECT_CREATE,
            HandlerBuilder.newMessageHandler(this.createProject.bind(this)));
        this.addHandler(VisualScriptingIpcChannelsMethodEnum.PROJECT_SAVE,
            HandlerBuilder.newMessageHandler(this.saveProject.bind(this)));
        this.addHandler(VisualScriptingIpcChannelsMethodEnum.PROJECT_LOAD,
            HandlerBuilder.newMessageHandler(this.loadProject.bind(this)));
        this.addHandler(VisualScriptingIpcChannelsMethodEnum.PROJECT_CLOSE,
            HandlerBuilder.newMessageHandler(this.closeProject.bind(this)));
        this.addHandler(VisualScriptingIpcChannelsMethodEnum.PROJECT_NODES_LIST_OF,
            HandlerBuilder.newMessageHandler(this.listNodesOf.bind(this)));
        this.addHandler(VisualScriptingIpcChannelsMethodEnum.PROJECT_NODES_CREATE_DIRECTORY,
            HandlerBuilder.newMessageHandler(this.createNodesDirectory.bind(this)));
        this.addHandler(VisualScriptingIpcChannelsMethodEnum.PROJECT_NODES_CREATE_NODE,
            HandlerBuilder.newMessageHandler(this.createNode.bind(this)));
    }

    async createProject(directory: DirectoryInterface|null): Promise<ProjectInterface>
    {
        await ProjectServiceInstance.createProject(directory!);
        await ProjectServiceInstance.saveProject();
        return ProjectServiceInstance.getProject();
    }

    async loadProject(file: RegularFileInterface|null): Promise<ProjectInterface>
    {
        return ProjectServiceInstance.loadProject(file!);
    }

    async saveProject(): Promise<ProjectInterface>
    {
        return ProjectServiceInstance.saveProject();
    }

    async closeProject(): Promise<void>
    {
        return ProjectServiceInstance.closeProject();
    }

    async listNodesOf(directories: DirectoryInterface[]|null): Promise<AbstractFileInterface[]>
    {
        return ProjectServiceInstance.listNodesOf(directories!);
    }

    async createNodesDirectory(createDirectory: CreateDirectoryInterface|null): Promise<DirectoryInterface>
    {
        return ProjectServiceInstance.createNodesDirectory(createDirectory!);
    }

    async createNode(createNode: CreateNodeInterface|null): Promise<NodeInterface>
    {
        return ProjectServiceInstance.createNode(createNode!);
    }
}