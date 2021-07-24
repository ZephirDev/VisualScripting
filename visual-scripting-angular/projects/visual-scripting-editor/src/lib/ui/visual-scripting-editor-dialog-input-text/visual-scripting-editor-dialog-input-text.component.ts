import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'visual-scripting-editor-dialog-input-text',
  templateUrl: './visual-scripting-editor-dialog-input-text.component.html',
  styleUrls: ['./visual-scripting-editor-dialog-input-text.component.scss']
})
export class VisualScriptingEditorDialogInputTextComponent implements OnInit {
  header?: string;
  message?: string;
  closeLabel: string;
  validateLabel: string;
  canValidate: (v: string) => boolean;
  value: string = "";

  constructor(
    private dynamicDialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
  )
  {
    this.header = config.data.header;
    this.message = config.data.message;
    this.closeLabel = config.data.closeLabel;
    if (!this.closeLabel) {
      this.closeLabel = "Cancel";
    }
    this.validateLabel = config.data.validateLabel;
    if (!this.validateLabel) {
      this.validateLabel = "Validate";
    }
    this.canValidate = config.data.canValidate;
    if (!this.canValidate) {
      this.canValidate = () => true;
    }
  }

  ngOnInit()
  {}

  close(value: string|null)
  {
    this.dynamicDialogRef.close(value);
  }
}
