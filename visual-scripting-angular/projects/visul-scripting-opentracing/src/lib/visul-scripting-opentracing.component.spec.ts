import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisulScriptingOpentracingComponent } from './visul-scripting-opentracing.component';

describe('VisulScriptingOpentracingComponent', () => {
  let component: VisulScriptingOpentracingComponent;
  let fixture: ComponentFixture<VisulScriptingOpentracingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisulScriptingOpentracingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisulScriptingOpentracingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
