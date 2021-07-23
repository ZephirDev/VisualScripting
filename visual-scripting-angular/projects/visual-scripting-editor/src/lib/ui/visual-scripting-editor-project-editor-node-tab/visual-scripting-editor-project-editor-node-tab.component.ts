import { VisualScriptingEditorDriverService } from './../../services/visual-scripting-editor-driver.service';
import { Component, OnInit } from '@angular/core';
import { TreeNode, MessageService } from 'primeng/api';
import { FileTypeEnum } from 'visual-scripting-common';

@Component({
  selector: 'visual-scripting-editor-project-editor-node-tab',
  templateUrl: './visual-scripting-editor-project-editor-node-tab.component.html',
  styleUrls: ['./visual-scripting-editor-project-editor-node-tab.component.scss']
})
export class VisualScriptingEditorProjectEditorNodeTabComponent implements OnInit {

  files: TreeNode[] = [];

  constructor(
    private driverService: VisualScriptingEditorDriverService,
    private messageService: MessageService
  )
  {}

  ngOnInit()
  {
    this.driverService.getDriver().getProject().listNodesOf([])
    .then(files => {
      for (let file of files) {
        this.files.push({
          label: file.name,
          icon: file.type === FileTypeEnum.DIRECTORY ? 'pi pi-folder' : 'pi pi-file',
        })
      }
    })
    .catch(err => {
      this.messageService.add({
        severity: 'error',
        summary: "List nodes",
        detail: JSON.stringify(err),
      })
    })
  }

}
