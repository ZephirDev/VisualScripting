import { TestBed } from '@angular/core/testing';

import { VisualScriptingEditorProjectService } from './visual-scripting-editor-project.service';

describe('VisualScriptingEditorProjectService', () => {
  let service: VisualScriptingEditorProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualScriptingEditorProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
