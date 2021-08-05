import {VisualScriptingIpcRaiseByEnum} from "../enums/visual-scripting-ipc-raise-by.enum";
import {ErrorInterface} from "../types/error.interface";
import {VisualScriptingIpcErrorEnum} from "../enums/visual-scripting-ipc-error.enum";

export class ErrorBuilder {
    static For(raiseBy: VisualScriptingIpcRaiseByEnum): ErrorBuilder
    {
        return new ErrorBuilder(raiseBy);
    }

    raiseBy: VisualScriptingIpcRaiseByEnum;
    annotations: {[k: string]: any};

    constructor(raiseBy: VisualScriptingIpcRaiseByEnum)
    {
        this.raiseBy = raiseBy;
        this.annotations = {};
    }

    addAnnotations(annotations: {[k: string]: any}): ErrorBuilder
    {
        this.annotations = Object.assign({}, this.annotations, annotations);
        return this;
    }

    addAnnotation(name: string, value?: any): ErrorBuilder
    {
        if (value) {
            this.annotations[name] = value;
        }
        return this;
    }

    klass(klass: string|{name?: string}): ErrorBuilder
    {
        if (typeof klass === 'string') {
            return this.addAnnotation('class', klass);
        } else if (klass.name) {
            return this.addAnnotation('class', klass.name);
        } else {
            return this;
        }
    }

    attribute(attribute: string): ErrorBuilder
    {
        return this.addAnnotation('attribute', attribute);
    }

    build(error: {code: number, what: string}, annotations?: {[k: string]: any}): ErrorInterface
    {
        return {
            raiseBy: this.raiseBy,
            code: error.code,
            what: error.what,
            annotations: Object.assign({}, this.annotations, annotations || {}),
        }
    }

    nullPointer(): ErrorInterface
    {
        return this.build(VisualScriptingIpcErrorEnum.NullPointer);
    }

    invalidNumberValue(value: number): ErrorInterface
    {
        return this.build(VisualScriptingIpcErrorEnum.InvalidNumberValue, {
            value,
        });
    }
}