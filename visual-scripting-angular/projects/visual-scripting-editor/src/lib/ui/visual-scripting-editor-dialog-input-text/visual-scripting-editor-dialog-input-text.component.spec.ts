/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VisualScriptingEditorDialogInputTextComponent } from './visual-scripting-editor-dialog-input-text.component';

describe('VisualScriptingEditorDialogInputTextComponent', () => {
  let component: VisualScriptingEditorDialogInputTextComponent;
  let fixture: ComponentFixture<VisualScriptingEditorDialogInputTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualScriptingEditorDialogInputTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualScriptingEditorDialogInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
