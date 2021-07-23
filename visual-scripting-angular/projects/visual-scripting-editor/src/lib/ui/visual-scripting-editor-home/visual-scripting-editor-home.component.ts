import { VisualScriptingEditorHomePanelEnum } from './../../enums/visual-scripting-editor-home-panel.enum';
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { VisualScriptingEditorFilesDialogComponentFileType } from '../visual-scripting-editor-files-dialog/visual-scripting-editor-files-dialog.component';
import { FileTypeEnum, RegularFileInterface } from 'visual-scripting-common';
import { VisualScriptingEditorDriverService } from '../../services/visual-scripting-editor-driver.service';
import { VisualScriptingEditorUiService } from '../../services/visual-scripting-editor-ui.service';
import { VisualScriptingEditorProjectService } from '../../services/visual-scripting-editor-project.service';

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

  constructor(
    private driverService: VisualScriptingEditorDriverService,
    private messageService: MessageService,
    private uiService: VisualScriptingEditorUiService,
    private projectService: VisualScriptingEditorProjectService)
  {}

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
    this.uiService.setLoading(true);
    this.driverService.getDriver().getProject().create(files[0].abstractFile)
    .then(project => {
      this.uiService.setLoading(false);
      return this.projectService.setProject(project);
    })
    .catch(err => {
      this.uiService.setLoading(false);
      this.messageService.add({
        severity: 'error',
        summary: 'Create project',
        detail: JSON.stringify(err),
      });
    });
  }

  canValidateLoadProjectSelector(parent: VisualScriptingEditorFilesDialogComponentFileType[], files: VisualScriptingEditorFilesDialogComponentFileType[]): boolean
  {
    return files.length === 1 && files[0].abstractFile.type === FileTypeEnum.REGULAR_FILE && files[0].abstractFile.name === "project.visual-scripting.json";
  }

  loadProject(parent: VisualScriptingEditorFilesDialogComponentFileType[], files: VisualScriptingEditorFilesDialogComponentFileType[]): void
  {
    this.uiService.setLoading(true);
    this.driverService.getDriver().getProject().load(files[0].abstractFile as RegularFileInterface)
    .then(project => {
      this.uiService.setLoading(false);
      return this.projectService.setProject(project);
    })
    .catch(err => {
      this.uiService.setLoading(false);
      this.messageService.add({
        severity: 'error',
        summary: 'Open project',
        detail: JSON.stringify(err),
      });
    });
  }
}
