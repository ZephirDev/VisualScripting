import { ElectronService } from 'ngx-electron';
import { VisualScriptingEditorDriverInterface, VisualScriptingEditorStorageInterface, VisualScriptingEditorSettingsInterface, VisualScriptingEditorProjectInterface } from 'visual-scripting-editor';
import { VisualScriptingElectronStorageService } from './visual-scripting-electron-storage.service';
import { VisualScriptingElectronSettingsService } from './visual-scripting-electron-settings.service';
import { VisualScriptingElectronProjectService } from './visual-scripting-electron-project.service';

export class VisualScriptingElectrongDriverService implements VisualScriptingEditorDriverInterface
{
  private storageService: VisualScriptingElectronStorageService;
  private settingsService: VisualScriptingElectronSettingsService;
  private projectService: VisualScriptingElectronProjectService;

  constructor(electronService: ElectronService)
  {
    this.storageService = new VisualScriptingElectronStorageService(electronService);
    this.settingsService = new VisualScriptingElectronSettingsService(electronService);
    this.projectService = new VisualScriptingElectronProjectService(electronService);
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
