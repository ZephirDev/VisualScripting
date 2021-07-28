import {OpentracingClientInterface} from "./opentracing-client.interface";
import {ZipkinOptionsInterface} from "../types/zipkin-options.interface";

import {Tracer, BatchRecorder, jsonEncoder} from 'zipkin';
import {ZipkinClient} from "../clients/zipkin.client";
import {ZipkinTracerDecorator} from "../decorators/zipkin-tracer.decorator";

export class ZipkinClient implements OpentracingClientInterface {
    private options: ZipkinOptionsInterface;

    constructor(options: ZipkinOptionsInterface)
    {
        this.options = options;
    }

    createZipkinTracer(name: string): Tracer
    {
        return new Tracer({
            ctxImpl: new CLSContext('zipkin'),
            recorder: new BatchRecorder({
                logger: new HttpLogger({
                    endpoint: `${this.options.scheme}://${this.options.host}:${this.options.port}/${this.options.path || '/api/v2/spans'}`,
                    jsonEncoder: jsonEncoder.JSON_V2,
                })
            }),
            localServiceName: name,
        });
    }

    newTracer(serviceName: string): OpentracingTracerDecoratorInterface
    {
        return new ZipkinTracerDecorator(this, name);
    }
}