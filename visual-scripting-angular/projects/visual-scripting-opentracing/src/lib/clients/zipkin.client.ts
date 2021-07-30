import {AbstractZipkinClient, ZipkinOptionsInterface, AbstractZipkinRecorder} from 'visual-scripting-common';
import {HttpClient} from "@angular/common/http";
import {ZipkinRecorder} from "../recorders/zipkin.recorder";

export class ZipkinClient extends AbstractZipkinClient {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient, options: ZipkinOptionsInterface) {
    super(options);
    this.httpClient = httpClient;
  }

  createZipkinRecorder(): AbstractZipkinRecorder
  {
    return new ZipkinRecorder(this.httpClient, this.options);
  }
}
