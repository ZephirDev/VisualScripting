import {ZipkinOptionsInterface} from "../types/zipkin-options.interface";

import {Tracer, BatchRecorder, jsonEncoder} from 'zipkin';
import {ZipkinClient} from "../clients/zipkin.client";

export class ZipkinTracerDecorator {
    tracer: Tracer;
    client: ZipkinClient;

    constructor(client: ZipkinClient, name: string)
    {
        this.client = client;
        this.tracer =
    }


}