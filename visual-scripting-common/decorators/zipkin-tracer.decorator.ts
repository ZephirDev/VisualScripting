import {AbstractZipkinClient} from "../clients/abstract-zipkin.client";
import {OpentracingTracerDecoratorInterface} from "./opentracing-tracer-decorator.interface";
import {OpentracingSpanDecoratorInterface} from "./opentracing-span-decorator.interface";
import {ZipkinSpanDecorator} from "./zipkin-span.decorator";
import {AbstractZipkinRecorder} from "../recorders/abstract-zipkin.recorder";
import {ZipkinSpanInterface} from "../types/zipkin-span.interface";
import {ZipkinSpanEndpointInterface} from "../types/zipkin-span-endpoint.interface";

export class ZipkinTracerDecorator implements OpentracingTracerDecoratorInterface {
    private client: AbstractZipkinClient;
    private name: string;
    private recorder: AbstractZipkinRecorder;
    private sampled: boolean;

    constructor(client: AbstractZipkinClient, name: string)
    {
        this.client = client;
        this.name = name;
        this.recorder = this.client.createZipkinRecorder();
        this.sampled = true;
    }

    createSpan(parent: OpentracingSpanDecoratorInterface|null, name: string): OpentracingSpanDecoratorInterface
    {
        if (parent) {
            const propagations = parent.getPropagationValues();
            return this.createSpanFromPropagations(propagations, name);
        } else {
            return new ZipkinSpanDecorator(this, null, name);
        }
    }

    createSpanFromPropagations(propagations: {[k: string]: string}, name: string) : OpentracingSpanDecoratorInterface
    {
        return new ZipkinSpanDecorator(this, ZipkinSpanDecorator.createSpanFromPropagations(this, propagations), name);
    }

    generateId(length: number): string
    {
        return this.recorder.generateId(length);
    }

    record(spans: ZipkinSpanInterface[]): void
    {
        for (let span of spans) {
            if (!span.localEndpoint) {
                span.localEndpoint = {} as ZipkinSpanEndpointInterface;
            }
            span.localEndpoint!.serviceName = this.name;
        }
        this.recorder.record(spans);
    }

    isSampled(): boolean
    {
        return this.sampled;
    }

    setSampled(sampled: boolean)
    {
        this.sampled = sampled;
    }
}