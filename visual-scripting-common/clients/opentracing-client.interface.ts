import {OpentracingTracerDecoratorInterface} from "../decorators/opentracing-tracer-decorator.interface";

export interface OpentracingClientInterface {
    newTracer(serviceName: string): OpentracingTracerDecoratorInterface;
}
