import * as uuid from 'uuid';

import {
    AbstractFileInterface,
    DirectoryInterface,
    MessageInterface,
    VisualScriptingIpcChannelsEnum,
    VisualScriptingIpcChannelsMethodEnum,
    VisualScriptingIpcDecorator,
} from '../common/public-api';
import { FileSystemServiceInstance } from '../services/file-system.service';

export class FileSystemIpcChannel extends VisualScriptingIpcDecorator {
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
        return FileSystemServiceInstance.getLastOpennedDirectory();
    }

    async listFilesOf(message: MessageInterface<DirectoryInterface[]>): Promise<AbstractFileInterface[]>
    {
        return FileSystemServiceInstance.listFilesOf(message.parameters!);
    }
};