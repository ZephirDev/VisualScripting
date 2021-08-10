import {IndexInterface} from "../common/types/index.interface";
import {ProjectServiceInstance} from "./project.service";
import * as fs from 'fs';
import {FileSystemServiceInstance} from "./file-system.service";
import {DirectoryInterface} from "../common/types/directory.interface";
import {RegularFileInterface} from "../common/types/regular-file.interface";
import {FileTypeEnum} from "../../../visual-scripting-common/enums/file-type.enum";
import {NodeInterface} from "../common/types/node.interface";

export class IndexService {
    private static readonly INDEX_FILENAME = 'index.visual-scripting.json';
    private index: IndexInterface|null;

    constructor()
    {
        this.index = null;
    }

    async makeIndex(): Promise<IndexInterface|null>
    {
        if (!ProjectServiceInstance.hasProject()) {
            return null;
        }

        let index: IndexInterface = {
            types: [{
                name: 'number',
                namespace: '',
            }, {
                name: 'string',
                namespace: '',
            }, {
                name: 'boolean',
                namespace: '',
            }],
        };

        let nodesFolder = ProjectServiceInstance.getNodesFolder();
        if (nodesFolder) {
            let indexNodes = async (path: DirectoryInterface[]) => {
                let files = await FileSystemServiceInstance.listFilesOf(path);
                for (let file of files) {
                    if (file.type === FileTypeEnum.REGULAR_FILE && file.name.endsWith('.node')) {
                        let node = await ProjectServiceInstance.loadNode(file as RegularFileInterface);
                        index.types.push({
                            name: node.name,
                            namespace: node.namespace,
                        });
                    } else if (file.type === FileTypeEnum.DIRECTORY) {
                        await indexNodes([...path, file]);
                    }
                }
            }
            await indexNodes([nodesFolder]);
        }

        return index;
    }

    async loadIndex(): Promise<IndexInterface|null>
    {
        if (!ProjectServiceInstance.hasProject()) {
            return null;
        }

        let project = ProjectServiceInstance.getProject();
        let indexPath = `${project.folder!.path}/${IndexService.INDEX_FILENAME}`;
        if (fs.existsSync(indexPath)) {
            this.index = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
        } else {
            this.index = await this.makeIndex();
            if (this.index) {
                await this.saveIndex();
            }
        }

        return this.index;
    }

    async saveIndex(): Promise<void>
    {
        if (!ProjectServiceInstance.hasProject() || !this.index) {
            return;
        }

        let project = ProjectServiceInstance.getProject();
        let indexPath = `${project.folder!.path}/${IndexService.INDEX_FILENAME}`;
        fs.writeFileSync(indexPath, JSON.stringify(this.index));
    }

    async getIndex(): Promise<IndexInterface|null>
    {
        return this.index;
    }

    async indexNode(node: NodeInterface): Promise<void>
    {
        if (this.index) {
            this.index.types.push({
                name: node.name,
                namespace: node.namespace,
            })
        }
    }
}

export const IndexServiceInstance = new IndexService();