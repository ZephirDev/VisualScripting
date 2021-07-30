import {AbstractOpentracingHelpers, ZipkinOptionsInterface, AbstractZipkinClient} from 'visual-scripting-common';
import {ZipkinClient} from "../clients/zipkin.client";
import {HttpClient} from "@angular/common/http";

export class OpentracingHelpers extends AbstractOpentracingHelpers {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    super();
    this.httpClient = httpClient;
  }

  newZipkinClient(options: ZipkinOptionsInterface): AbstractZipkinClient
  {
    return new ZipkinClient(this.httpClient, options);
  }
}
