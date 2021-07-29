import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualScriptingOpentracingComponent } from './visual-scripting-opentracing.component';

describe('VisulScriptingOpentracingComponent', () => {
  let component: VisualScriptingOpentracingComponent;
  let fixture: ComponentFixture<VisualScriptingOpentracingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualScriptingOpentracingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualScriptingOpentracingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
