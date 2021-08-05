import {AbstractZipkinRecorder, ZipkinSpanInterface, ZipkinOptionsInterface} from 'visual-scripting-common';
import {HttpClient} from "@angular/common/http";

export class ZipkinRecorder extends AbstractZipkinRecorder {
  private httpClient: HttpClient;
  private options: ZipkinOptionsInterface;

  constructor(httpClient: HttpClient, options: ZipkinOptionsInterface) {
    super();
    this.options = options;
    this.httpClient = httpClient;
  }

  record(spans: ZipkinSpanInterface[]): void
  {
    this.httpClient.post(`${this.options.scheme}://${this.options.host}:${this.options.port}/${this.options.path || 'api/v2/spans'}`, JSON.stringify(spans))
      .subscribe((result) => {}, console.log);
  }

}
