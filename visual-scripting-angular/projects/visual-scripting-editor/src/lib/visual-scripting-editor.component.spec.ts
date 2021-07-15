import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualScriptingEditorComponent } from './visual-scripting-editor.component';

describe('VisualScriptingEditorComponent', () => {
  let component: VisualScriptingEditorComponent;
  let fixture: ComponentFixture<VisualScriptingEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualScriptingEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualScriptingEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
