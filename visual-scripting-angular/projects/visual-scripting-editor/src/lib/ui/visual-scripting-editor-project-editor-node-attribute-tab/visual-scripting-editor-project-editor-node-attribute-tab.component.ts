import {Component, Input, OnInit} from '@angular/core';
import { NodeInterface, NodeAttributeInterface } from 'visual-scripting-common';
import {VisualScriptingEditorProjectService} from "../../services/visual-scripting-editor-project.service";

@Component({
  selector: 'visual-scripting-editor-project-editor-node-attribute-tab',
  templateUrl: './visual-scripting-editor-project-editor-node-attribute-tab.component.html',
  styleUrls: ['./visual-scripting-editor-project-editor-node-attribute-tab.component.css']
})
export class VisualScriptingEditorProjectEditorNodeAttributeTabComponent implements OnInit {

  @Input()
  nodeAttributes: NodeAttributeInterface[] = [];

  @Input()
  nodeAttribute: NodeAttributeInterface|null = null;

  constructor(
      private projectService: VisualScriptingEditorProjectService
  )
  {}

  ngOnInit(): void
  {}

  getAttributeName(): string
  {
    return this.nodeAttribute!.name;
  }

  setAttributeName(name: string): void
  {
    this.nodeAttribute!.name = name;
  }

  validateAttributeName(name: string): boolean
  {
    let self = false;
    for (let attr of this.nodeAttributes) {
      if (attr.name === name && attr !== this.nodeAttribute) {
        return false;
      }

      if (attr === this.nodeAttribute) {
        self = true;
      }
    }

    return self;
  }

  getAttributeType(): string
  {
    return this.nodeAttribute!.type;
  }

  setAttributeType(type: string): void
  {
    this.nodeAttribute!.type = type;
  }

  getAvailableAttributeTypes(): string[]
  {
    return this.projectService.getIndex().types.map(type => `${type.namespace}::${type.name}`);
  }
}
