/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VisualScriptingEditorProjectEditorNodeTabComponent } from './visual-scripting-editor-project-editor-node-tab.component';

describe('VisualScriptingEditorProjectEditorNodeTabComponent', () => {
  let component: VisualScriptingEditorProjectEditorNodeTabComponent;
  let fixture: ComponentFixture<VisualScriptingEditorProjectEditorNodeTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualScriptingEditorProjectEditorNodeTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualScriptingEditorProjectEditorNodeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
