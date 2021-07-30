import * as uuid from 'uuid';
import {VisualScriptingIpcDecorator} from "../common/decorators/visual-scripting-ipc.decorator";
import {VisualScriptingIpcChannelsEnum} from "../common/enums/visual-scripting-ipc-channels.enum";
import {VisualScriptingIpcChannelsMethodEnum} from "../common/enums/visual-scripting-ipc-channels-method.enum";
import {OpentracingOptionsInterface} from "../common/types/opentracing-options.interface";
import {MessageInterface} from "../common/types/message.interface";
import {OptionsServiceInstance} from "../services/options.service";

export class OptionsIpcChannel extends VisualScriptingIpcDecorator {

    constructor(ipc: any) {
        super(ipc, VisualScriptingIpcChannelsEnum.OPTIONS, uuid.v4);
        this.addHandler<void, OpentracingOptionsInterface|null>(
            VisualScriptingIpcChannelsMethodEnum.OPTIONS_GET_OPENTRACING,
            this.getOpentracingOptions.bind(this));
    }

    getOpentracingOptions(message: MessageInterface<void>): Promise<OpentracingOptionsInterface|null>
    {
        return OptionsServiceInstance.getOpentracingOptions();
    }
}