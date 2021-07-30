import {OpentracingSpanDecoratorInterface} from "./opentracing-span-decorator.interface";

export interface OpentracingTracerDecoratorInterface {
    createSpan(parent: OpentracingSpanDecoratorInterface|null, name: string) : OpentracingSpanDecoratorInterface;
    createSpanFromPropagations(parent: {[k: string]: string}, name: string) : OpentracingSpanDecoratorInterface;
}