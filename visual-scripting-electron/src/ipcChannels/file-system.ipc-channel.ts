import * as uuid from 'uuid';

import {
    AbstractFileInterface,
    DirectoryInterface,
    MessageInterface,
    VisualScriptingIpcChannelsEnum,
    VisualScriptingIpcChannelsMethodEnum,
    IpcDecorator, HandlerBuilder,
} from '../common/public-api';
import { FileSystemServiceInstance } from '../services/file-system.service';

export class FileSystemIpcChannel extends IpcDecorator {
    constructor(ipc: any)
    {
        super(ipc, VisualScriptingIpcChannelsEnum.FILE_SYSTEM);
        this.addHandler(VisualScriptingIpcChannelsMethodEnum.FILE_SYSTEM_LAST_OPENNED_DIR,
            HandlerBuilder.newMessageHandler(this.getLastOpennedDirectory.bind(this)));
        this.addHandler(VisualScriptingIpcChannelsMethodEnum.FILE_SYSTEM_LIST,
            HandlerBuilder.newMessageHandler(this.listFilesOf.bind(this)));
    }

    async getLastOpennedDirectory(): Promise<DirectoryInterface[]>
    {
        return FileSystemServiceInstance.getLastOpennedDirectory();
    }

    async listFilesOf(message: DirectoryInterface[]|null): Promise<AbstractFileInterface[]>
    {
        return FileSystemServiceInstance.listFilesOf(message!);
    }
};