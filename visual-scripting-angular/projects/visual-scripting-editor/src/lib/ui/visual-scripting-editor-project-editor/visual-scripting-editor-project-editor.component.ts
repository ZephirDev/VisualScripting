import { VisualScriptingEditorProjectEditorTabEnum } from './../../enums/visual-scripting-editor-project-editor-tab.enum';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { VisualScriptingEditorProjectService } from '../../services/visual-scripting-editor-project.service';
import { SettingInterface, SettingsInterface } from 'visual-scripting-common';

@Component({
  selector: 'visual-scripting-editor-project-editor',
  templateUrl: './visual-scripting-editor-project-editor.component.html',
  styleUrls: ['./visual-scripting-editor-project-editor.component.scss']
})
export class VisualScriptingEditorProjectEditorComponent implements OnInit {

  project: MenuItem;
  menu: MenuItem[];

  projectSettings: SettingInterface[];
  options: SettingsInterface[];

  private tab = VisualScriptingEditorProjectEditorTabEnum.ACTIONS_TAB;

  constructor(
    private projectService: VisualScriptingEditorProjectService
  )
  {
    this.project = {label: "Untitled", disabled: true};
    this.menu = [
      this.project,
      {label: 'Nodes', icon: 'pi pi-plus', command: this.setTab.bind(this, VisualScriptingEditorProjectEditorTabEnum.NODES_TAB),},
      {label: 'Modules', icon: 'pi pi-table', command: this.setTab.bind(this, VisualScriptingEditorProjectEditorTabEnum.MODULES_TAB),},
      {label: 'Lifelines', icon: 'pi pi-sitemap', command: this.setTab.bind(this, VisualScriptingEditorProjectEditorTabEnum.LIFELINES_TAB),},
      {label: 'Actions', icon: 'pi pi-play', command: this.setTab.bind(this, VisualScriptingEditorProjectEditorTabEnum.ACTIONS_TAB),},
      {label: 'Settings', icon: 'pi pi-cog', command: this.setTab.bind(this, VisualScriptingEditorProjectEditorTabEnum.SETTINGS_TAB),},
    ];
    this.projectSettings = [];
    this.options = [{
      section: 'Project',
      settings: this.projectSettings,
    }];
  }

  ngOnInit()
  {
    const project = this.projectService.getProject();
    this.project.label = project.name;
    this.projectSettings.splice(0, this.projectSettings.length);
    this.projectSettings.push({
      name: "project.version",
      readonly: true,
      type: 'string',
      value: `${project.version.major}.${project.version.minor}.${project.version.patch}`,
    });
  }

  private setTab(tab: VisualScriptingEditorProjectEditorTabEnum)
  {
    this.tab = tab;
  }

  isNodesTab(): boolean
  {
    return this.tab == VisualScriptingEditorProjectEditorTabEnum.NODES_TAB;
  }

  isModulesTab(): boolean
  {
    return this.tab == VisualScriptingEditorProjectEditorTabEnum.MODULES_TAB;
  }

  isLifelinesTab(): boolean
  {
    return this.tab == VisualScriptingEditorProjectEditorTabEnum.LIFELINES_TAB;
  }

  isActionsTab(): boolean
  {
    return this.tab == VisualScriptingEditorProjectEditorTabEnum.ACTIONS_TAB;
  }

  isSettingsTab(): boolean
  {
    return this.tab == VisualScriptingEditorProjectEditorTabEnum.SETTINGS_TAB;
  }
}
