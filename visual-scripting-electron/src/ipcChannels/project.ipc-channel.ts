import * as uuid from 'uuid';

import {
    DirectoryInterface,
    MessageInterface,
    ProjectInterface,
    VisualScriptingIpcChannelsEnum,
    VisualScriptingIpcChannelsMethodEnum,
    VisualScriptingIpcDecorator,
} from './../common/public-api';
import { AbstractFileInterface } from './../common/types/abstract-file.interface';
import { RegularFileInterface } from './../common/types/regular-file.interface';
import { ProjectServiceInstance } from './../services/project.service';

export class ProjectIpcChannel extends VisualScriptingIpcDecorator {
    private project: ProjectInterface|null = null;

    constructor(ipc: any)
    {
        super(ipc, VisualScriptingIpcChannelsEnum.PROJECT, uuid.v4);
        this.addHandler<DirectoryInterface, ProjectInterface>(
            VisualScriptingIpcChannelsMethodEnum.PROJECT_CREATE,
            this.createProject.bind(this));
        this.addHandler<void, ProjectInterface>(
            VisualScriptingIpcChannelsMethodEnum.PROJECT_SAVE,
            this.saveProject.bind(this));
        this.addHandler<RegularFileInterface, ProjectInterface>(
            VisualScriptingIpcChannelsMethodEnum.PROJECT_LOAD,
            this.loadProject.bind(this));
        this.addHandler<void, void>(
            VisualScriptingIpcChannelsMethodEnum.PROJECT_CLOSE,
            this.closeProject.bind(this));
        this.addHandler<DirectoryInterface[], AbstractFileInterface[]>(
            VisualScriptingIpcChannelsMethodEnum.PROJECT_NODES_LIST_OF,
            this.listNodesOf.bind(this));
    }

    async createProject(message: MessageInterface<DirectoryInterface>): Promise<ProjectInterface>
    {
        await ProjectServiceInstance.createProject(message.parameters!);
        await ProjectServiceInstance.saveProject();
        return ProjectServiceInstance.getProject();
    }

    async loadProject(message: MessageInterface<RegularFileInterface>): Promise<ProjectInterface>
    {
        return ProjectServiceInstance.loadProject(message.parameters!);
    }

    async saveProject(message: MessageInterface<void>): Promise<ProjectInterface>
    {
        return ProjectServiceInstance.saveProject();
    }

    async closeProject(message: MessageInterface<void>): Promise<void>
    {
        return ProjectServiceInstance.closeProject();
    }

    async listNodesOf(message: MessageInterface<DirectoryInterface[]>): Promise<AbstractFileInterface[]>
    {
        return ProjectServiceInstance.listNodesOf(message.parameters!);
    }
}