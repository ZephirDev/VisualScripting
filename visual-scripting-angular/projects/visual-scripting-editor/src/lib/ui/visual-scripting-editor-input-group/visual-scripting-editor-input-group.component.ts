import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'visual-scripting-editor-input-group',
  templateUrl: './visual-scripting-editor-input-group.component.html',
  styleUrls: ['./visual-scripting-editor-input-group.component.css']
})
export class VisualScriptingEditorInputGroupComponent implements OnInit {

  @Input()
  type: 'string' | 'list' = 'string';

  @Input()
  getter: () => string = () => {
    return "";
  };

  @Input()
  setter: (value: string) => void = () => {};

  @Input()
  validate: (value: string) => boolean = () => {
    return true;
  };

  @Input()
  values: string[] = [];

  @Input()
  styleClass: string = '';

  cache: string = '';
  model: string = '';
  edit: boolean = false;

  constructor()
  {}

  ngOnInit(): void
  {
    this.cache = this.getter();
  }

  startEditing(): void
  {
    this.model = this.getter();
    this.edit = true;
  }

  canFinish(): boolean
  {
    return this.validate(this.model);
  }

  finishEditing(): void
  {
    if (!this.canFinish()) {
      return;
    }

    this.setter(this.model);
    this.cache = this.model;
    this.edit = false;
  }

  getDropdownOptions(): {name: string, value: string}[]
  {
    return this.values.map(item => {
      return {
        name: item,
        value: item,
      }
    })
  }
}
