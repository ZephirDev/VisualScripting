/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VisualScriptingEditorFilesDialogComponent } from './visual-scripting-editor-files-dialog.component';

describe('VisualScriptingEditorFilesDialogComponent', () => {
  let component: VisualScriptingEditorFilesDialogComponent;
  let fixture: ComponentFixture<VisualScriptingEditorFilesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualScriptingEditorFilesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualScriptingEditorFilesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
