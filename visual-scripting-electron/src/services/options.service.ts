import {EnvInterface} from "../common/types/env.interface";
import * as fs from 'fs';
import {MessageInterface} from "../../../visual-scripting-common/types/message.interface";
import {OpentracingOptionsInterface} from "../../../visual-scripting-common/types/opentracing-options.interface";

export class OptionsService {
    env: EnvInterface;

    constructor() {
        this.env = {};
        const envPath = `${__dirname}/../assets/env.json`;
        if (fs.existsSync(envPath)) {
            this.env = JSON.parse(fs.readFileSync(envPath, "utf-8"));
        }
    }

    async getOpentracingOptions(): Promise<OpentracingOptionsInterface|null>
    {
        if (this.env.opentracing) {
            return this.env.opentracing;
        } else {
            return null;
        }
    }
}

export const OptionsServiceInstance = new OptionsService();