import { ElectronService } from 'ngx-electron';
import { VisualScriptingEditorDriverInterface, VisualScriptingEditorStorageInterface, VisualScriptingEditorSettingsInterface } from 'visual-scripting-editor';
import { VisualScriptingElectronStorageService } from './visual-scripting-electron-storage.service';
import { VisualScriptingElectronSettingsService } from './visual-scripting-electron-settings.service';

export class VisualScriptingElectrongDriverService implements VisualScriptingEditorDriverInterface
{
  storageService: VisualScriptingElectronStorageService;
  settingsService: VisualScriptingElectronSettingsService;

  constructor(electronService: ElectronService)
  {
    this.storageService = new VisualScriptingElectronStorageService(electronService);
    this.settingsService = new VisualScriptingElectronSettingsService(electronService);
  }

  getStorage(): VisualScriptingEditorStorageInterface
  {
    return this.storageService;
  }

  getSettings(): VisualScriptingEditorSettingsInterface
  {
    return this.settingsService;
  }
}
