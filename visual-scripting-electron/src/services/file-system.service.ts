import * as fs from 'fs';
import * as path from 'path';

import {
    DirectoryInterface,
    ErrorInterface,
    FileTypeEnum,
    RegularFileInterface,
    VisualScriptingIpcErrorEnum,
    VisualScriptingIpcRaiseByEnum,
} from './../common/public-api';
import { AbstractFileInterface } from './../common/types/abstract-file.interface';

export class FileSystemService {
    private lastDirectoryOpenned: DirectoryInterface[] = this.getDefaultDirectories();

    async getLastOpennedDirectory(): Promise<DirectoryInterface[]>
    {
        return this.lastDirectoryOpenned;
    }

    async listFilesOf(folders: DirectoryInterface[]): Promise<AbstractFileInterface[]>
    {
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
            
            if (path.length !== 0 && path.charAt(path.length - 1) == '/') {
                path += dir.name;
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

        let children = fs.readdirSync(path);
        this.lastDirectoryOpenned = folders;

        let childrenFiles: AbstractFileInterface[] = [];
        for (let child of children) {
            let childPath = `${path}/${child}`;
            childrenFiles.push(this.getFileInterfaceOf(childPath)!);
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

            const itemPath =  `${path === '/' ? '' : path}/${item}`;
            files.push(this.getDirectoryInterfaceOf(itemPath)!);
            path = itemPath;
        }
        return files;
    }

    getFileInterfaceOf(path: string): AbstractFileInterface|null
    {
        if (fs.existsSync(path)) {
            let stat = fs.statSync(path);
            if (stat.isDirectory()) {
                return this.getDirectoryInterfaceOf(path);
            } else {
                return this.getRegularFileInterfaceOf(path);
            }
        }
        return null;
    }

    getDirectoryInterfaceOf(path: string): DirectoryInterface|null
    {
        if (fs.existsSync(path)) {
            let stat = fs.statSync(path);
            if (stat.isDirectory()) {
                let groups = /^(.*)\/+([^\/]+)\/*$/.exec(path);
                let name = '/';
                let dirname: string = '/';
                if (groups) {
                    name = groups[2];
                    dirname = groups[1];
                    if (dirname === "") {
                        dirname = "/";
                    }
                }

                return {
                    path,
                    name,
                    dirname,
                    mode: stat.mode,
                    type: FileTypeEnum.DIRECTORY,
                };
            }
        }
        return null;
    }

    getRegularFileInterfaceOf(path: string): RegularFileInterface|null
    {
        if (fs.existsSync(path)) {
            let stat = fs.statSync(path);
            if (!stat.isDirectory()) {
                let groups = /^(.*)\/+([^\/]+)$/.exec(path);
                let name = '';
                let dirname: string = '/';
                if (groups) {
                    name = groups[2];
                    dirname = groups[1];
                    if (dirname === "") {
                        dirname = "/";
                    }
                }
                groups = /^(.+)[.]([^.]+)$/.exec(name);
                let filename = name;
                let extension = '';
                if (groups) {
                    filename = groups[1];
                    extension = groups[2];
                }

                return {
                    path,
                    name,
                    dirname,
                    filename,
                    extension,
                    mode: stat.mode,
                    type: FileTypeEnum.REGULAR_FILE,
                };
            }
        }
        return null;
    }
}

export const FileSystemServiceInstance = new FileSystemService();