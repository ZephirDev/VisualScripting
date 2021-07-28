import { TestBed } from '@angular/core/testing';

import { VisulScriptingOpentracingService } from './visul-scripting-opentracing.service';

describe('VisulScriptingOpentracingService', () => {
  let service: VisulScriptingOpentracingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisulScriptingOpentracingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
