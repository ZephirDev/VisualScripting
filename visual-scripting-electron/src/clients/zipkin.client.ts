import {AbstractZipkinClient} from "../common/clients/abstract-zipkin.client";
import {ZipkinRecorder} from "../recorders/zipkin.recorder";
import {AbstractZipkinRecorder} from "../common/recorders/abstract-zipkin.recorder";
import {ZipkinOptionsInterface} from "../common/types/zipkin-options.interface";

export class ZipkinClient extends AbstractZipkinClient {
    constructor(options: ZipkinOptionsInterface) {
        super(options);
    }

    createZipkinRecorder(): AbstractZipkinRecorder {
        return new ZipkinRecorder(this.options);
    }
}