import {ZipkinOptionsInterface} from "./zipkin-options.interface";

export interface OpentracingOptionsInterface {
    enable: boolean,
    driver?: "zipkin",
    zipkin?: ZipkinOptionsInterface,
}