import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TabMenuModule } from 'primeng/tabmenu';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { TagModule } from 'primeng/tag';
import { TreeModule } from 'primeng/tree';

import { MessageService } from 'primeng/api';

// project component
import { VisualScriptingEditorComponent } from './visual-scripting-editor.component';
import { VisualScriptingEditorHomeComponent } from './ui/visual-scripting-editor-home/visual-scripting-editor-home.component';
import { VisualScriptingEditorFilesDialogComponent } from './ui/visual-scripting-editor-files-dialog/visual-scripting-editor-files-dialog.component';
import { VisualScriptingEditorProjectEditorComponent } from './ui/visual-scripting-editor-project-editor/visual-scripting-editor-project-editor.component';
import { VisualScriptingEditorProjectEditorNodeTabComponent } from './ui/visual-scripting-editor-project-editor-node-tab/visual-scripting-editor-project-editor-node-tab.component';

@NgModule({
  declarations: [
    VisualScriptingEditorComponent,
    VisualScriptingEditorHomeComponent,
    VisualScriptingEditorFilesDialogComponent,
    VisualScriptingEditorProjectEditorComponent,
    VisualScriptingEditorProjectEditorNodeTabComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MenuModule,
    ButtonModule,
    CardModule,
    DataViewModule,
    BreadcrumbModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    TabMenuModule,
    AccordionModule,
    InputTextModule,
    InputNumberModule,
    CheckboxModule,
    TagModule,
    TreeModule,
  ],
  exports: [
    VisualScriptingEditorComponent,
  ],
  providers: [
    MessageService
  ],
})
export class VisualScriptingEditorModule { }
