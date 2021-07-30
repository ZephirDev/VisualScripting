import {OpentracingClientInterface} from "./opentracing-client.interface";
import {ZipkinOptionsInterface} from "../types/zipkin-options.interface";
import {ZipkinTracerDecorator} from "../decorators/zipkin-tracer.decorator";
import {OpentracingTracerDecoratorInterface} from "../decorators/opentracing-tracer-decorator.interface";
import {AbstractZipkinRecorder} from "../recorders/abstract-zipkin.recorder";

export abstract class AbstractZipkinClient implements OpentracingClientInterface {
    protected options: ZipkinOptionsInterface;

    protected constructor(options: ZipkinOptionsInterface)
    {
        this.options = options;
    }

    abstract createZipkinRecorder(): AbstractZipkinRecorder;

    newTracer(serviceName: string): OpentracingTracerDecoratorInterface
    {
        return new ZipkinTracerDecorator(this, serviceName);
    }
}