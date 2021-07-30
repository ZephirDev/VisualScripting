import {AbstractZipkinClient} from "../clients/abstract-zipkin.client";
import {OpentracingClientInterface} from "../clients/opentracing-client.interface";
import {OpentracingOptionsInterface} from "../types/opentracing-options.interface";
import {ZipkinOptionsInterface} from "../types/zipkin-options.interface";
import {ErrorInterface} from "../types/error.interface";
import {VisualScriptingIpcErrorEnum} from "../enums/visual-scripting-ipc-error.enum";

export abstract class AbstractOpentracingHelpers {
    abstract newZipkinClient(options: ZipkinOptionsInterface): AbstractZipkinClient;

    newClient(options: OpentracingOptionsInterface): OpentracingClientInterface
    {
        if (!options.enable) {
            throw {
                raiseBy: "common",
                code: VisualScriptingIpcErrorEnum.VisualScriptingIpcOpentracingDriverCreationDisabled.code,
                what: VisualScriptingIpcErrorEnum.VisualScriptingIpcOpentracingDriverCreationDisabled.what,
                annotations: {
                    opentracing: {
                        driver: options.driver,
                    }
                }
            } as ErrorInterface;
        }

        if (options.driver === "zipkin" || !options.zipkin) {
            return this.newZipkinClient(options.zipkin!);
        } else {
            throw {
                raiseBy: "common",
                code: VisualScriptingIpcErrorEnum.VisualScriptingIpcOpentracingDriverCreationFailure.code,
                what: VisualScriptingIpcErrorEnum.VisualScriptingIpcOpentracingDriverCreationFailure.what,
                annotations: {
                    opentracing: {
                        driver: options.driver,
                    }
                }
            } as ErrorInterface;
        }
    }
}