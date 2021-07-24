import { VisualScriptingEditorDriverService } from './../../services/visual-scripting-editor-driver.service';
import { Component, OnInit } from '@angular/core';
import { TreeNode, MessageService } from 'primeng/api';
import { FileTypeEnum, AbstractFileInterface, DirectoryInterface } from 'visual-scripting-common';
import { DialogService } from 'primeng/dynamicdialog';
import { VisualScriptingEditorDialogInputTextComponent } from '../visual-scripting-editor-dialog-input-text/visual-scripting-editor-dialog-input-text.component';
import { VisualScriptingEditorUiService } from '../../services/visual-scripting-editor-ui.service';

@Component({
  selector: 'visual-scripting-editor-project-editor-node-tab',
  templateUrl: './visual-scripting-editor-project-editor-node-tab.component.html',
  styleUrls: ['./visual-scripting-editor-project-editor-node-tab.component.scss']
})
export class VisualScriptingEditorProjectEditorNodeTabComponent implements OnInit {

  selectedFile?: TreeNode;
  files: TreeNode[] = [];

  constructor(
    private driverService: VisualScriptingEditorDriverService,
    private messageService: MessageService,
    private dynamicDialogService: DialogService,
    private uiService: VisualScriptingEditorUiService,
  )
  {}

  ngOnInit()
  {
    this.listDirectory();
  }

  listDirectory(treeNode?: TreeNode)
  {
    let directories: DirectoryInterface[] = [];
    if (treeNode) {
      let item: TreeNode|undefined = treeNode;
      do {
        directories.push(item.data.file);
        item = treeNode.parent;
      } while(item);
      directories = directories.reverse();
    }

    this.driverService.getDriver().getProject().listNodesOf(directories)
    .then(files => {
      let list: TreeNode[] = this.files;
      if (treeNode) {
        list = treeNode!.children!;
      }
      for (let file of files) {
        list.push({
          label: file.name,
          icon: file.type === FileTypeEnum.DIRECTORY ? 'pi pi-folder' : 'pi pi-file',
          children: [],
          data: {
            file,
          }
        })
      }
    })
    .catch(err => {
      this.messageService.add({
        severity: 'error',
        summary: "List nodes",
        detail: JSON.stringify(err),
      })
    });
  }

  openNewDirectoryPopup(parent?: TreeNode)
  {
    this.dynamicDialogService.open(VisualScriptingEditorDialogInputTextComponent, {
      header: "New directory",
      data: {
        message: "Directory name",
        canValidate: (name: string) => {
          let children: TreeNode[] = this.files;
          if (parent) {
            children = parent.children || [];
          }
          for (let node of children) {
            if (node.data.file.name == name) {
              return false;
            }
          }
          return true;
        }
      }
    }).onClose.subscribe((name?: string) => {
      if (!name) {
        return;
      }

      let folders: DirectoryInterface[] = [];
      if (parent) {
        let item: TreeNode|undefined = parent;
        do {
          folders.push(item.data.file);
          item = item.parent;
        } while(item);
        folders = folders.reverse();
      }

      this.uiService.setLoading(true);
      this.driverService.getDriver().getProject().createNodesDirectoryOf(folders, name)
      .then(file => {
        let item = {
          label: file.name,
          icon: file.type === FileTypeEnum.DIRECTORY ? 'pi pi-folder' : 'pi pi-file',
          children: [],
          data: {
            file,
          }
        };

        if (parent) {
          parent.children!.push(item)
        } else {
          this.files.push(item);
        }

        this.uiService.setLoading(false);
      })
      .catch(err => {
        this.uiService.setLoading(false);
        this.messageService.add({
          severity: 'error',
          summary: "Create directory node",
          detail: JSON.stringify(err),
        })
      });
    });
  }

  onFileSelect($event: any)
  {
      let node: TreeNode = $event.node;
      let file: AbstractFileInterface = node.data.file;
      if (FileTypeEnum.DIRECTORY == file.type) {
        console.log(JSON.stringify(node));
        this.listDirectory(node);
      }
  }
}
