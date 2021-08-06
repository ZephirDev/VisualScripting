import * as uuid from 'uuid';
import {VisualScriptingIpcChannelsEnum} from "../common/enums/visual-scripting-ipc-channels.enum";
import {VisualScriptingIpcChannelsMethodEnum} from "../common/enums/visual-scripting-ipc-channels-method.enum";
import {OpentracingOptionsInterface} from "../common/types/opentracing-options.interface";
import {OptionsServiceInstance} from "../services/options.service";
import {IpcDecorator} from "../common/decorators/ipc.decorator";
import {HandlerBuilder} from "../common/builders/handler.builder";

export class OptionsIpcChannel extends IpcDecorator {

    constructor(ipc: any) {
        super(ipc, VisualScriptingIpcChannelsEnum.OPTIONS);
        this.addHandler(VisualScriptingIpcChannelsMethodEnum.OPTIONS_GET_OPENTRACING,
            HandlerBuilder.newMessageHandler(this.getOpentracingOptions.bind(this)));
    }

    getOpentracingOptions(): Promise<OpentracingOptionsInterface|null>
    {
        return OptionsServiceInstance.getOpentracingOptions();
    }
}