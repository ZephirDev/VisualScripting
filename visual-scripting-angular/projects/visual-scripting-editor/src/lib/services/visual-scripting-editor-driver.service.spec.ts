/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VisualScriptingEditorDriverService } from './visual-scripting-editor-driver.service';

describe('Service: VisualScriptingEditorDriver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisualScriptingEditorDriverService]
    });
  });

  it('should ...', inject([VisualScriptingEditorDriverService], (service: VisualScriptingEditorDriverService) => {
    expect(service).toBeTruthy();
  }));
});
