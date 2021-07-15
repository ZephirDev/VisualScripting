import { Component } from '@angular/core';
import { VisualScriptingEditorDriverInterface } from 'visual-scripting-editor';
import { ElectronService } from 'ngx-electron';
import { VisualScriptingIpcDecorator, VisualScriptingIpcChannelsMethodEnum, VisualScriptingIpcChannelsEnum } from 'visual-scripting-common';
import { VisualScriptingElectrongDriverService } from './driver/visual-scripting-electron-driver.service';

import * as uuid from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './app.colors.scss']
})
export class AppComponent {
  title = 'visual-scripting-angular';
  driver: VisualScriptingEditorDriverInterface|null = null;
  electronService: ElectronService;

  constructor(electronService: ElectronService)
  {
    this.electronService = electronService;
    this.driver = new VisualScriptingElectrongDriverService(electronService);
  }

  ngOnInit(): void {
    this.electronService.ipcRenderer.send('test', 'blop');
    let ipc = new VisualScriptingIpcDecorator(this.electronService.ipcRenderer, VisualScriptingIpcChannelsEnum.FILE_SYSTEM, () => {
      return uuid.v4();
    });
    ipc.listen();
    ipc.send<string[], string[]>(VisualScriptingIpcChannelsMethodEnum.FILE_SYSTEM_LIST, [])
    .then(r => {
      console.log(r);
    }, e => {
      console.log('error');
      console.log(e);
    });
  }

}
