import { TestBed } from '@angular/core/testing';

import { VisualScriptingOpentracingService } from './visual-scripting-opentracing.service';

describe('VisulScriptingOpentracingService', () => {
  let service: VisualScriptingOpentracingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualScriptingOpentracingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
