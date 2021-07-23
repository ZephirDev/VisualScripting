/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VisualScriptingEditorUiService } from './visual-scripting-editor-ui.service';

describe('Service: VisualScriptingEditorUi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisualScriptingEditorUiService]
    });
  });

  it('should ...', inject([VisualScriptingEditorUiService], (service: VisualScriptingEditorUiService) => {
    expect(service).toBeTruthy();
  }));
});
