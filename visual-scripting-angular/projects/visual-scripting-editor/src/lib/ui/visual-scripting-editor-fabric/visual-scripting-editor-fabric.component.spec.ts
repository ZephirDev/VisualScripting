import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualScriptingEditorFabricComponent } from './visual-scripting-editor-fabric.component';

describe('VisualScriptingEditorFabricComponent', () => {
  let component: VisualScriptingEditorFabricComponent;
  let fixture: ComponentFixture<VisualScriptingEditorFabricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualScriptingEditorFabricComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualScriptingEditorFabricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
