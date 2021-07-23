/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VisualScriptingEditorProjectEditorComponent } from './visual-scripting-editor-project-editor.component';

describe('VisualScriptingEditorProjectEditorComponent', () => {
  let component: VisualScriptingEditorProjectEditorComponent;
  let fixture: ComponentFixture<VisualScriptingEditorProjectEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualScriptingEditorProjectEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualScriptingEditorProjectEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
