import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualScriptingEditorProjectEditorNodeAttributeTabComponent } from './visual-scripting-editor-project-editor-node-attribute-tab.component';

describe('VisualScriptingEditorProjectEditorNodeAttributeTabComponent', () => {
  let component: VisualScriptingEditorProjectEditorNodeAttributeTabComponent;
  let fixture: ComponentFixture<VisualScriptingEditorProjectEditorNodeAttributeTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualScriptingEditorProjectEditorNodeAttributeTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualScriptingEditorProjectEditorNodeAttributeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
