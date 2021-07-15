import { VisualScriptingEditorKeyboardService } from './../../services/visual-scripting-editor-keyboard.service';
import { MenuItem } from 'primeng/api';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractFileInterface, FileTypeEnum, DirectoryInterface } from 'visual-scripting-common';
import { VisualScriptingEditorDriverService } from '../../services/visual-scripting-editor-driver.service';
import * as KeyCodes from '@angular/cdk/keycodes';

interface VisualScriptingEditorFilesDialogComponentFileType {
  abstractFile: AbstractFileInterface,
  icon: string,
  selected: boolean,
  dblClick: () => Promise<void>,
  click: () => Promise<void>,
}

@Component({
  selector: 'visual-scripting-editor-files-dialog',
  templateUrl: './visual-scripting-editor-files-dialog.component.html',
  styleUrls: ['./visual-scripting-editor-files-dialog.component.scss']
})
export class VisualScriptingEditorFilesDialogComponent implements OnInit {
  @Input()
  validateButtonText = "Validate";

  @Input()
  multiSelect = true;

  private loading = true;
  private breadcrumb: MenuItem[] = [];
  private breadcrumbFiles: VisualScriptingEditorFilesDialogComponentFileType[] = [];
  private files: VisualScriptingEditorFilesDialogComponentFileType[] = [];
  private driverSevice: VisualScriptingEditorDriverService;
  private keys: {[key: string]: boolean} = {};
  private keyboardService: VisualScriptingEditorKeyboardService;

  readonly home: MenuItem = {icon: "pi pi-home", command: this.openDirectory.bind(this, [])};

  constructor(driverService: VisualScriptingEditorDriverService, keyboardService: VisualScriptingEditorKeyboardService) {
    this.driverSevice = driverService;
    this.keyboardService = keyboardService;
  }

  ngOnInit()
  {
    this.driverSevice.getDriver().getStorage()
    .getLastOpennedDirectory()
    .then(files => {
      return this.openDirectory(this.castPathToAngularFileType(files));
    })
    .catch(error => {
      console.log(error, JSON.stringify(error));
    })
  }

  private async openDirectory(folders: VisualScriptingEditorFilesDialogComponentFileType[]): Promise<void>
  {
    this.loading = true;
    this.breadcrumbFiles = folders;
    this.buildBreadcrumb();
    let files = await this.driverSevice.getDriver().getStorage().listFilesOf(folders.map(folder => folder.abstractFile));
    this.setFiles(files);
    this.loading = false;
  }

  private buildBreadcrumb()
  {
    this.breadcrumb = [];
    for (let i = 0; i < this.breadcrumbFiles.length; i++) {
      let item = this.breadcrumbFiles[i];
      this.breadcrumb.push({
        label: item.abstractFile.name,
        command: this.openDirectory.bind(this, this.breadcrumbFiles.slice(0, i+1))
      });
    }
  }

  getBreadcrumb(): MenuItem[]
  {
    return this.breadcrumb;
  }

  private setFiles(files: AbstractFileInterface[])
  {
    this.files = this.castToAngularFileType(files, this.breadcrumbFiles);
  }

  getFiles(): VisualScriptingEditorFilesDialogComponentFileType[]
  {
    return this.files;
  }

  private async select(file: VisualScriptingEditorFilesDialogComponentFileType): Promise<void>
  {
    if (!this.multiSelect && !this.keyboardService.isPress(KeyCodes.CONTROL)) {
      for (let item of this.files) {
        item.selected = false;
      }
      file.selected = true;
    } else {
      file.selected = !file.selected;
    }
  }

  isLoading(): boolean
  {
    return this.loading;
  }

  private castToAngularFileType(files: AbstractFileInterface[], parents: VisualScriptingEditorFilesDialogComponentFileType[]): VisualScriptingEditorFilesDialogComponentFileType[]
  {
    let angularFiles: VisualScriptingEditorFilesDialogComponentFileType[] = [];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      let angularFile: VisualScriptingEditorFilesDialogComponentFileType = {
        abstractFile: file,
        icon: FileTypeEnum.DIRECTORY === file.type ? 'pi pi-folder' : 'pi pi-file',
        selected: false,
        click: () => Promise.resolve(),
        dblClick: () => Promise.resolve(),
      };
      angularFiles.push(angularFile);
      angularFile.click = this.select.bind(this, angularFile);
      if (angularFile.abstractFile.type == FileTypeEnum.DIRECTORY) {
        angularFile.dblClick = this.openDirectory.bind(this, [...parents, angularFile]);
      }
    }
    return angularFiles;
  }

  private castPathToAngularFileType(files: AbstractFileInterface[]): VisualScriptingEditorFilesDialogComponentFileType[]
  {
    let angularFiles: VisualScriptingEditorFilesDialogComponentFileType[] = [];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      angularFiles.push(...this.castToAngularFileType([file], angularFiles));
    }
    return angularFiles;
  }
}
