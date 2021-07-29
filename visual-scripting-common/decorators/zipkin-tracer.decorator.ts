import {ZipkinClient} from "../clients/zipkin.client";
import {OpentracingTracerDecoratorInterface} from "./opentracing-tracer-decorator.interface";

export class ZipkinTracerDecorator {
    tracer: OpentracingTracerDecoratorInterface;
    client: ZipkinClient;

    constructor(client: ZipkinClient, name: string)
    {
        this.client = client;
        this.tracer = client.newTracer(name);
    }




}