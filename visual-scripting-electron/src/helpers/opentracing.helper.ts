import {AbstractOpentracingHelpers} from "../common/helpers/abstract-opentracing.helpers";
import {ZipkinClient} from "../clients/zipkin.client";
import {ZipkinOptionsInterface} from "../common/types/zipkin-options.interface";
import {AbstractZipkinClient} from "../common/clients/abstract-zipkin.client";

export class OpentracingHelper extends AbstractOpentracingHelpers {

    newZipkinClient(options: ZipkinOptionsInterface): AbstractZipkinClient
    {
        return new ZipkinClient(options);
    }

}