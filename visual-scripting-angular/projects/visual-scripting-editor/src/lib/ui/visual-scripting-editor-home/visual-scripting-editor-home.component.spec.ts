/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VisualScriptingEditorHomeComponent } from './visual-scripting-editor-home.component';

describe('VisualScriptingEditorHomeComponent', () => {
  let component: VisualScriptingEditorHomeComponent;
  let fixture: ComponentFixture<VisualScriptingEditorHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualScriptingEditorHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualScriptingEditorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
