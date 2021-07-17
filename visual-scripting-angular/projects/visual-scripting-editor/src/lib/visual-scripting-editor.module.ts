import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

// project component
import { VisualScriptingEditorComponent } from './visual-scripting-editor.component';
import { VisualScriptingEditorHomeComponent } from './ui/visual-scripting-editor-home/visual-scripting-editor-home.component';
import { VisualScriptingEditorFilesDialogComponent } from './ui/visual-scripting-editor-files-dialog/visual-scripting-editor-files-dialog.component';

@NgModule({
  declarations: [
    VisualScriptingEditorComponent,
    VisualScriptingEditorHomeComponent,
    VisualScriptingEditorFilesDialogComponent,
  ],
  imports: [
    BrowserModule,
    MenuModule,
    ButtonModule,
    CardModule,
    DataViewModule,
    BreadcrumbModule,
    TableModule,
    ToastModule,
  ],
  exports: [
    VisualScriptingEditorComponent,
  ],
  providers: [
    MessageService
  ],
})
export class VisualScriptingEditorModule { }
