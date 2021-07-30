import {ZipkinSpanEndpointInterface} from "./zipkin-span-endpoint.interface";
import {ZipkinSpanAnnotationInterface} from "./zipkin-span-annotation.interface";

export interface ZipkinSpanInterface {
    id: string,
    traceId: string,
    parentId?: string,
    name: string,
    timestamp: number,
    duration: number,
    debug?: boolean,
    shared?: boolean,
    kind: "SERVER" | "CLIENT" | "PRODUCER" | "CONSUMER",
    localEndpoint?: ZipkinSpanEndpointInterface,
    remoteEndpoint?: ZipkinSpanEndpointInterface,
    annotations: ZipkinSpanAnnotationInterface[],
    tags: {[k: string]: string}
}