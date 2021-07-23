import { VisualScriptingEditorKeyboardService } from './services/visual-scripting-editor-keyboard.service';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { VisualScriptingEditorDriverInterface } from './interfaces/visual-scripting-editor-driver.interface';
import { VisualScriptingEditorDriverService } from './services/visual-scripting-editor-driver.service';
import { VisualScriptingEditorUiService } from './services/visual-scripting-editor-ui.service';

@Component({
  selector: 'visual-scripting-editor',
  templateUrl: './visual-scripting-editor.component.html',
  styleUrls: [
    './visual-scripting-editor.component.scss',
  ],
  providers: [VisualScriptingEditorDriverService]
})
export class VisualScriptingEditorComponent implements OnInit {

  @Input()
  driver: VisualScriptingEditorDriverInterface|null = null;

  projectReady: boolean = false;

  constructor(
    private driverService: VisualScriptingEditorDriverService,
    private keyboardService: VisualScriptingEditorKeyboardService,
    public uiService: VisualScriptingEditorUiService)
  {}

  ngOnInit(): void {
    if (this.driver) {
      this.driverService.setDriver(this.driver);
    }
    this.projectReady = false;
    this.driverService.getDriver().getSettings().getProject().subscribe({
      next: (project) => {
        this.projectReady = project != null;
      }
    });
  }

  @HostListener('window:keydown', ['$event'])
  pressKeyboardEvent(event: KeyboardEvent)
  {
    this.keyboardService.handle(event, true);
  }

  @HostListener('window:keyup', ['$event'])
  releaseKeyboardEvent(event: KeyboardEvent)
  {
    this.keyboardService.handle(event, false);
  }
}
