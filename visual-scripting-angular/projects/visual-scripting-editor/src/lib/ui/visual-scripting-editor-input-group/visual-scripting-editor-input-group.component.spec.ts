import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualScriptingEditorInputGroupComponent } from './visual-scripting-editor-input-group.component';

describe('VisualScriptingEditorInputGroupComponent', () => {
  let component: VisualScriptingEditorInputGroupComponent;
  let fixture: ComponentFixture<VisualScriptingEditorInputGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualScriptingEditorInputGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualScriptingEditorInputGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
