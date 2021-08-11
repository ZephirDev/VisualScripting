import * as fs from 'fs';

import {Version} from '../version';
import {
    AbstractFileInterface,
    CreateDirectoryInterface,
    DirectoryInterface,
    ErrorBuilder,
    ErrorInterface,
    FileTypeEnum,
    ProjectInterface,
    RegularFileInterface,
    VisualScriptingIpcErrorEnum,
    VisualScriptingIpcRaiseByEnum,
} from './../common/public-api';
import {FileSystemServiceInstance} from './file-system.service';
import {CreateNodeInterface} from "../../../visual-scripting-common/types/create-node.interface";
import {NodeInterface} from "../common/types/node.interface";

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

    createNodesFolder()
    {
        if (!fs.existsSync(`${this.project!.folder!.path}/nodes`)) {
            fs.mkdirSync(`${this.project!.folder!.path}/nodes`, {
                recursive: true,
            });
        }
    }

    getNodesFolder(): DirectoryInterface|null
    {
        return FileSystemServiceInstance.getDirectoryInterfaceOf(`${this.project!.folder!.path}/nodes`);
    }
    
    async listNodesOf(directories: DirectoryInterface[]): Promise<AbstractFileInterface[]>
    {
        let nodeFolder = this.getNodesFolder();
        if (!nodeFolder) {
            return [];
        }

        let files = await FileSystemServiceInstance.listFilesOf([nodeFolder].concat(directories));
        return FileSystemServiceInstance.filter(files, {
            types: FileTypeEnum.DIRECTORY,
        }).concat(
            FileSystemServiceInstance.filter(files, {
                extensions: 'node'
            })
        );
    }

    async createNodesDirectory(createDirectory: CreateDirectoryInterface): Promise<DirectoryInterface>
    {
        this.createNodesFolder();
        return FileSystemServiceInstance.mkdir([this.getNodesFolder()!].concat(createDirectory.directories), createDirectory.name);
    }

    private guardNode(node: NodeInterface)
    {
        if (['string', 'number', 'boolean'].includes(node.name)) {
            throw ErrorBuilder.For(VisualScriptingIpcRaiseByEnum.ANGULAR)
                .addAnnotations({
                    node
                })
                .build(VisualScriptingIpcErrorEnum.VisualScriptingIpcNodeNameInvalid);
        }
    }

    async createNode(createNode: CreateNodeInterface): Promise<NodeInterface>
    {
        this.createNodesFolder();
        let nodesFolder = this.getNodesFolder()!;
        let folders: DirectoryInterface[] = [nodesFolder, {
            path: nodesFolder.path + '/' + nodesFolder.name + '/.',
            name: '.',
            dirname: nodesFolder.path + '/' + nodesFolder.name,
            mode: nodesFolder.mode,
            type: FileTypeEnum.DIRECTORY,
        }, ...createNode.parents];
        let parent = await FileSystemServiceInstance.mkdir(folders.slice(0, folders.length - 1), folders[folders.length - 1]);
        let path = parent.path + '/' + createNode.name + '.node';

        if (fs.existsSync(path)) {
            throw {
                raiseBy: VisualScriptingIpcRaiseByEnum.ELECTRON,
                code: VisualScriptingIpcErrorEnum.VisualScriptingIpcFileExists.code,
                what: VisualScriptingIpcErrorEnum.VisualScriptingIpcFileExists.what,
                annotations: {
                    parent,
                    path,
                }
            } as ErrorInterface;
        }

        let nodeInterface: NodeInterface = {
            version: Version,
            namespace: createNode.parents.reduce<string>((aggregator, item) => {
                return aggregator + "::" + item.name;
            }, ""),
            name: createNode.name,
            languages: [],
            attributes: [],
        }

        this.guardNode(nodeInterface);
        fs.writeFileSync(path, JSON.stringify(nodeInterface, null, 4));
        nodeInterface.file = FileSystemServiceInstance.getRegularFileInterfaceOf(path)!;
        return nodeInterface;
    }

    async loadNode(file: RegularFileInterface): Promise<NodeInterface>
    {
        if (!fs.existsSync(file.path)) {
            throw ErrorBuilder.For(VisualScriptingIpcRaiseByEnum.ELECTRON)
                .addAnnotations({
                    path: file.path,
                })
                .build(VisualScriptingIpcErrorEnum.VisualScriptingIpcFileNotExists);
        }

        let node = JSON.parse(fs.readFileSync(file.path, 'utf-8')) as NodeInterface;
        node.file = file;
        return node;
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