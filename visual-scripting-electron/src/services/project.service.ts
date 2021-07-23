import * as fs from 'fs';

import { Version } from '../version';
import {
    DirectoryInterface,
    ErrorInterface,
    ProjectInterface,
    RegularFileInterface,
    VisualScriptingIpcErrorEnum,
    VisualScriptingIpcRaiseByEnum,
} from './../common/public-api';
import { FileSystemServiceInstance } from './file-system.service';

export class ProjectService {
    private static readonly PROJECT_FILENAME = 'project.visual-scripting.json';
    private project: ProjectInterface|null = null;

    async createProject(directory: DirectoryInterface): Promise<ProjectInterface>
    {
        if ([directory.path, `${directory.path}/${ProjectService.PROJECT_FILENAME}`].reduce((exist, file) => exist && fs.existsSync(file), true)) {
            throw {
                raiseBy: VisualScriptingIpcRaiseByEnum.ELECTRON,
                code: VisualScriptingIpcErrorEnum.VisualScriptingIpcProjectExists.code,
                what: VisualScriptingIpcErrorEnum.VisualScriptingIpcProjectExists.what,
            } as ErrorInterface;
        }

        this.project = {
            version: Version,
            folder: directory,
            name: "Untitled",
            plugins: [],
            nodes: {},
            modules: {},
            lifelines: {},
        };

        return this.saveProject();
    }

    async loadProject(file: RegularFileInterface): Promise<ProjectInterface>
    {
        if (!this.project) {
            await this.closeProject();
        }
        
        if (ProjectService.PROJECT_FILENAME != file.name || !file.path.endsWith(ProjectService.PROJECT_FILENAME) || !fs.existsSync(file.path)) {
            throw {
                raiseBy: VisualScriptingIpcRaiseByEnum.ELECTRON,
                code: VisualScriptingIpcErrorEnum.VisualScriptingIpcFileIsNotProjectFile.code,
                what: VisualScriptingIpcErrorEnum.VisualScriptingIpcFileIsNotProjectFile.what,
                annotations: {
                    file,
                },
            } as ErrorInterface;
        }

        this.project = JSON.parse(fs.readFileSync(file.path, 'utf-8'));
        this.project!.folder = FileSystemServiceInstance.getDirectoryInterfaceOf(file.dirname!)!;
        return this.project!;
    }

    async saveProject(): Promise<ProjectInterface>
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

        fs.writeFileSync(`${this.project.folder!.path}/${ProjectService.PROJECT_FILENAME}`, JSON.stringify(projectToSave, null, 4));
        return this.project;
    }

    async closeProject(): Promise<void>
    {
        this.project = null;
    }

    getProject(): ProjectInterface
    {
        if (!this.project) {
            throw {
                raiseBy: VisualScriptingIpcRaiseByEnum.ELECTRON,
                code: VisualScriptingIpcErrorEnum.VisualScriptingIpcNoOpenProject.code,
                what: VisualScriptingIpcErrorEnum.VisualScriptingIpcNoOpenProject.what,
            } as ErrorInterface;
        }

        return this.project;
    }

    hasProject(): boolean
    {
        return this.project !== null;
    }
}

export const ProjectServiceInstance = new ProjectService();