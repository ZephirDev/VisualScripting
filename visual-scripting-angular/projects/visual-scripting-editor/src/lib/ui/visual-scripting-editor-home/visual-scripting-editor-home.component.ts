import { VisualScriptingEditorHomePanelEnum } from './../../enums/visual-scripting-editor-home-panel.enum';
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { VisualScriptingEditorFilesDialogComponentFileType } from '../visual-scripting-editor-files-dialog/visual-scripting-editor-files-dialog.component';
import { FileTypeEnum } from 'visual-scripting-common';
import { VisualScriptingEditorDriverService } from '../../services/visual-scripting-editor-driver.service';

@Component({
  selector: 'visual-scripting-editor-home',
  templateUrl: './visual-scripting-editor-home.component.html',
  styleUrls: ['./visual-scripting-editor-home.component.scss']
})
export class VisualScriptingEditorHomeComponent implements OnInit {

  menu: MenuItem[] = [
    {
      label: 'Visual Project',
      items: [
        {label: 'New project', icon: 'pi pi-plus', command: this.setNewPanelActive.bind(this)},
        {label: 'Open recent project', icon: 'pi pi-folder-open', command: this.setOpenRecentPanelActive.bind(this)},
        {label: 'Open project', icon: 'pi pi-folder', command: this.setOpenPanelActive.bind(this)},
      ],
    },
  ];

  private panel = VisualScriptingEditorHomePanelEnum.DEFAULT;
  private driverService: VisualScriptingEditorDriverService;
  private messageService: MessageService;

  constructor(driverService: VisualScriptingEditorDriverService, messageService: MessageService)
  {
    this.driverService = driverService;
    this.messageService = messageService;
  }

  ngOnInit() {
  }

  isDefaultPanelActive(): boolean
  {
    return this.panel === VisualScriptingEditorHomePanelEnum.DEFAULT;
  }

  setDefaultPanelActive()
  {
    this.panel = VisualScriptingEditorHomePanelEnum.DEFAULT;
  }

  isOpenPanelActive(): boolean
  {
    return this.panel === VisualScriptingEditorHomePanelEnum.OPEN_PROJECT;
  }

  setOpenPanelActive()
  {
    this.panel = VisualScriptingEditorHomePanelEnum.OPEN_PROJECT;
  }

  isOpenRecentPanelActive(): boolean
  {
    return this.panel === VisualScriptingEditorHomePanelEnum.OPEN_RECENT_PROJECT;
  }

  setOpenRecentPanelActive()
  {
    this.panel = VisualScriptingEditorHomePanelEnum.OPEN_RECENT_PROJECT;
  }

  isNewPanelActive(): boolean
  {
    return this.panel === VisualScriptingEditorHomePanelEnum.NEW_PROJECT;
  }

  setNewPanelActive()
  {
    this.panel = VisualScriptingEditorHomePanelEnum.NEW_PROJECT;
  }

  canValidateCreateProjectSelector(parent: VisualScriptingEditorFilesDialogComponentFileType[], files: VisualScriptingEditorFilesDialogComponentFileType[]): boolean
  {
    return files.length === 1 && files[0].abstractFile.type === FileTypeEnum.DIRECTORY;
  }

  createProject(parent: VisualScriptingEditorFilesDialogComponentFileType[], files: VisualScriptingEditorFilesDialogComponentFileType[]): void
  {
    this.driverService.getDriver().getProject().create(files[0].abstractFile)
    .catch(err => {
      this.messageService.add({
        severity: 'error',
        summary: 'Create project',
        detail: JSON.stringify(err),
      });
    });
  }
}
