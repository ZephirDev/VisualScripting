/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VisualScriptingEditorKeyboardService } from './visual-scripting-editor-keyboard.service';

describe('Service: VisualScriptingEditorKeyboard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisualScriptingEditorKeyboardService]
    });
  });

  it('should ...', inject([VisualScriptingEditorKeyboardService], (service: VisualScriptingEditorKeyboardService) => {
    expect(service).toBeTruthy();
  }));
});
