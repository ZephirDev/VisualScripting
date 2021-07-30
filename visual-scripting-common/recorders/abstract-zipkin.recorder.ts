import {ZipkinSpanInterface} from "../types/zipkin-span.interface";

export abstract class AbstractZipkinRecorder {
    generateId(length: number): string
    {
        let result = '';
        const characters = 'abcdef0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    abstract record(spans: ZipkinSpanInterface[]): void;
}