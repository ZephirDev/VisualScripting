import * as uuid from 'uuid';
import * as fs from 'fs';
import {
    DirectoryInterface,
    VisualScriptingIpcChannelsEnum,
    VisualScriptingIpcChannelsMethodEnum,
    VisualScriptingIpcDecorator,
    ProjectInterface,
    MessageInterface,
    ErrorInterface,
    VisualScriptingIpcRaiseByEnum,
    VisualScriptingIpcErrorEnum,
} from './../common/public-api';
import { Version } from '../version';

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
    }

    async createProject(message: MessageInterface<DirectoryInterface>): Promise<ProjectInterface>
    {
        const directory = message.parameters!.path;
        if ([directory, `${directory}/project.visual-scripting.json`].reduce((exist, file) => exist && fs.existsSync(file), true)) {
            throw {
                raiseBy: VisualScriptingIpcRaiseByEnum.ELECTRON,
                code: VisualScriptingIpcErrorEnum.VisualScriptingIpcProjectExists.code,
                what: VisualScriptingIpcErrorEnum.VisualScriptingIpcProjectExists.what,
            } as ErrorInterface;
        }

        this.project = {
            version: Version,
            folder: message.parameters!,
            name: "Untitled",
        };

        return this.saveProject({
            id: message.id,
            method: message.method,
        });
    }

    async saveProject(message: MessageInterface<void>): Promise<ProjectInterface>
    {
        if (!this.project) {
            throw {
                raiseBy: VisualScriptingIpcRaiseByEnum.ELECTRON,
                code: VisualScriptingIpcErrorEnum.VisualScriptingIpcNoOpenProject.code,
                what: VisualScriptingIpcErrorEnum.VisualScriptingIpcNoOpenProject.what,
            } as ErrorInterface;
        }

        let projectToSave: ProjectInterface = JSON.parse(JSON.stringify(this.project));
        delete projectToSave.folder;

        fs.writeFileSync(`${this.project.folder!.path}/project.visual-scripting.json`, JSON.stringify(projectToSave));
        return this.project;
    }
}