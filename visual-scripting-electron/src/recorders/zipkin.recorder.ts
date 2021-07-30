import {AbstractZipkinRecorder} from "../common/recorders/abstract-zipkin.recorder";
import {ZipkinSpanInterface} from "../common/types/zipkin-span.interface";
import * as http from 'http';
import * as https from 'https';
import {ZipkinOptionsInterface} from "../common/types/zipkin-options.interface";

export class ZipkinRecorder extends AbstractZipkinRecorder {
    private options: ZipkinOptionsInterface;

    constructor(options: ZipkinOptionsInterface)
    {
        super();
        this.options = options;
    }

    record(spans: ZipkinSpanInterface[]): void
    {
        let client = this.options.scheme === "https" ? https : http;
        let data = JSON.stringify(spans);
        let req = client.request({
            host: this.options.host,
            port: this.options.port,
            method: "POST",
            path: this.options.path || '/api/v2/spans',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        });
        req.write(data);
        req.end();
    }
}