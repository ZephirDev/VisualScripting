import { VisualScriptingIpcRaiseByEnum, VisualScriptingIpcErrorEnum, ErrorInterface, MessageInterface, VisualScriptingIpcDecorator, VisualScriptingIpcChannelsEnum, DirectoryInterface, AbstractFileInterface, RegularFileInterface, VisualScriptingIpcChannelsMethodEnum, FileTypeEnum } from './../common/public-api';
import * as uuid from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

export class FileSystemIpcChannel extends VisualScriptingIpcDecorator {
    private lastDirectoryOpenned: DirectoryInterface[] = this.getDefaultDirectories();

    constructor(ipc: any)
    {
        super(ipc, VisualScriptingIpcChannelsEnum.FILE_SYSTEM, uuid.v4);
        this.addHandler<null,DirectoryInterface[]>(
            VisualScriptingIpcChannelsMethodEnum.FILE_SYSTEM_LAST_OPENNED_DIR,
            this.getLastOpennedDirectory.bind(this));
        this.addHandler<DirectoryInterface[],DirectoryInterface[]>(
            VisualScriptingIpcChannelsMethodEnum.FILE_SYSTEM_LIST,
            this.listFilesOf.bind(this));
    }

    async getLastOpennedDirectory(): Promise<DirectoryInterface[]>
    {
        return this.lastDirectoryOpenned;
    }

    async listFilesOf(message: MessageInterface<DirectoryInterface[]>): Promise<AbstractFileInterface[]>
    {
        let folders = [...message.parameters!];
        if (folders.length == 0) {
            folders = this.getDefaultDirectories();
        }
        
        let path = folders[0].dirname || '';
        for (let dir of folders) {
            if (dir.name.includes('/')) {
                throw {
                    raiseBy: VisualScriptingIpcRaiseByEnum.ELECTRON,
                    code: VisualScriptingIpcErrorEnum.VisualScriptingIpcAbstractFileNameViolation.code,
                    what: VisualScriptingIpcErrorEnum.VisualScriptingIpcAbstractFileNameViolation.what,
                    annotations: {
                        invalidCharacters: ['/']
                    }
                } as ErrorInterface;
            }
            
            if (path.length == 0) {
                path = dir.name;
            } else {
                path += '/' + dir.name;
            }
        }

        path = path.replace(/[\/]/, '/');
        if (/(^|\/)[.]{1,2}(\/|$)/.exec(path)) {
            throw {
                raiseBy: VisualScriptingIpcRaiseByEnum.ELECTRON,
                code: VisualScriptingIpcErrorEnum.VisualScriptingIpcAbstractFileNameViolation.code,
                what: VisualScriptingIpcErrorEnum.VisualScriptingIpcAbstractFileNameViolation.what,
                annotations: {
                    invalidFolderName: [
                        '..',
                        '.'
                    ],
                    path,
                }
            } as ErrorInterface;
        }

        if (!fs.existsSync(path)) {
            throw {
                raiseBy: VisualScriptingIpcRaiseByEnum.ELECTRON,
                code: VisualScriptingIpcErrorEnum.VisualScriptingIpcPathDoesntExists.code,
                what: VisualScriptingIpcErrorEnum.VisualScriptingIpcPathDoesntExists.what,
                annotations: {
                    path
                }
            } as ErrorInterface;
        }

        let children = fs.readdirSync(path, {
            withFileTypes: true,
        });
        this.lastDirectoryOpenned = folders;

        let childrenFiles: AbstractFileInterface[] = [];
        for (let child of children) {
            if (child.isDirectory()) {
                childrenFiles.push({
                    name: child.name,
                    type: FileTypeEnum.DIRECTORY,
                    mode: fs.statSync(`${path}/${child.name}`).mode,
                    path: `${path}/${child.name}`,
                    dirname: path,
                } as DirectoryInterface);
            } else {
                let filename = child.name.split('.');
                childrenFiles.push({
                    name: child.name,
                    type: FileTypeEnum.REGULAR_FILE,
                    mode: fs.statSync(`${path}/${child.name}`).mode,
                    path: `${path}/${child.name}`,
                    dirname: path,
                    filename: filename.slice(0, -1).join('.'),
                    extension: filename[filename.length - 1],
                } as RegularFileInterface);
            }
        }

        return childrenFiles;
    }

    getDefaultDirectories(): DirectoryInterface[]
    {
        let home = process.env.HOME!.split(/\/+/);
        let files: DirectoryInterface[] = [];
        let path = '/';
        for (let item of home) {
            if (item.length == 0) {
                continue;
            }

            files.push({
                path: `${path === '/' ? '' : path}/${item}`,
                name: item,
                dirname: path,
                mode: fs.statSync(`${path === '/' ? '' : path}/${item}`).mode,
                type: FileTypeEnum.DIRECTORY,
            });
            
            path = `${path}${item}`;
        }
        return files;
    }
};