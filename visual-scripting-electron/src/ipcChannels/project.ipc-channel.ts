import * as uuid from 'uuid';

import {
    DirectoryInterface,
    VisualScriptingIpcChannelsEnum,
    VisualScriptingIpcChannelsMethodEnum,
    VisualScriptingIpcDecorator,
    ProjectInterface,
    MessageInterface,
} from './../common/public-api';

export class ProjectIpcChannel extends VisualScriptingIpcDecorator {

    constructor(ipc: any)
    {
        super(ipc, VisualScriptingIpcChannelsEnum.PROJECT, uuid.v4);
        this.addHandler<DirectoryInterface, ProjectInterface>(
            VisualScriptingIpcChannelsMethodEnum.PROJECT_CREATE,
            this.createProject.bind(this));
    }

    async createProject(message: MessageInterface<DirectoryInterface>): Promise<ProjectInterface>
    {
        throw "test";
    }
}