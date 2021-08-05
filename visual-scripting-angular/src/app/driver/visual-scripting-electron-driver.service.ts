import { ElectronService } from 'ngx-electron';
import { EventsService } from 'visual-scripting-common';
import { VisualScriptingEditorDriverInterface, VisualScriptingEditorStorageInterface, VisualScriptingEditorSettingsInterface, VisualScriptingEditorProjectInterface } from 'visual-scripting-editor';
import { VisualScriptingOpentracingService } from 'visual-scripting-opentracing';
import { VisualScriptingElectronStorageService } from './visual-scripting-electron-storage.service';
import { VisualScriptingElectronSettingsService } from './visual-scripting-electron-settings.service';
import { VisualScriptingElectronProjectService } from './visual-scripting-electron-project.service';

export class VisualScriptingElectrongDriverService implements VisualScriptingEditorDriverInterface
{
  private storageService: VisualScriptingElectronStorageService;
  private settingsService: VisualScriptingElectronSettingsService;
  private projectService: VisualScriptingElectronProjectService;

  constructor(electronService: ElectronService, opentracingService: VisualScriptingOpentracingService)
  {
    EventsService.Init();
    EventsService.GetInstance().addHandlerFromStruct(opentracingService.getIpcEventHandlers());
    this.storageService = new VisualScriptingElectronStorageService(electronService, opentracingService);
    this.settingsService = new VisualScriptingElectronSettingsService(electronService, opentracingService);
    this.projectService = new VisualScriptingElectronProjectService(electronService, opentracingService);
  }

  getStorage(): VisualScriptingEditorStorageInterface
  {
    return this.storageService;
  }

  getSettings(): VisualScriptingEditorSettingsInterface
  {
    return this.settingsService;
  }

  getProject(): VisualScriptingEditorProjectInterface
  {
    return this.projectService;
  }
}
