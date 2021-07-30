import {OpentracingSpanDecoratorInterface} from "./opentracing-span-decorator.interface";
import {ZipkinTracerDecorator} from "./zipkin-tracer.decorator";
import {ZipkinSpanInterface} from "../types/zipkin-span.interface";

export class ZipkinSpanDecorator implements OpentracingSpanDecoratorInterface {
    static createSpanFromPropagations(tracer: ZipkinTracerDecorator, propagations: {[k: string]: string}): ZipkinSpanDecorator
    {
        let span = new ZipkinSpanDecorator(tracer, null, "");
        span.span.traceId = propagations['X-B3-TraceId'];
        span.span.parentId = propagations['X-B3-ParentSpanId'];
        span.span.id = propagations['X-B3-SpanId'];
        return span;
    }

    private tracer: ZipkinTracerDecorator;
    private parentSpan: ZipkinSpanDecorator|null;
    private span: ZipkinSpanInterface;

    constructor(tracer: ZipkinTracerDecorator, parentSpan: ZipkinSpanDecorator|null, name: string)
    {
        this.tracer = tracer;
        this.parentSpan = parentSpan;
        this.span = {
            traceId: this.parentSpan ? this.parentSpan.span.traceId : this.tracer.generateId(32),
            id: this.tracer.generateId(16),
            name,
            kind: "CLIENT",
            duration: 1,
            timestamp: Date.now() * 1000,
            tags: {},
            annotations: [],
        };
        if (this.parentSpan) {
            this.span.parentId = this.parentSpan.span.id;
        }
    }

    createChild(name: string): OpentracingSpanDecoratorInterface
    {
        return new ZipkinSpanDecorator(this.tracer, this, name);
    }

    tag(name: string, value: string): void
    {
        this.span.tags[name] = value;
    }

    finish(): void
    {
        this.tracer.record([this.span]);
    }

    getPropagationValues(): {[k: string]: string}
    {
        let props: {[k: string]: string} = {
            'X-B3-TraceId': this.span.traceId,
            'X-B3-SpanId': this.span.id,
        };

        if (this.span.parentId) {
            props['X-B3-ParentSpanId'] = this.span.parentId;
        }

        if (this.tracer.isSampled()) {
            props['X-B3-Sampled'] = 'true';
        }

        return props;
    }

}
