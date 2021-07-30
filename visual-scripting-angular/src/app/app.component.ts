import { Component } from '@angular/core';
import { VisualScriptingEditorDriverInterface } from 'visual-scripting-editor';
import { ElectronService } from 'ngx-electron';
import { VisualScriptingOpentracingService } from 'visual-scripting-opentracing';
import { VisualScriptingElectrongDriverService } from './driver/visual-scripting-electron-driver.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './app.colors.scss']
})
export class AppComponent {
  title = 'visual-scripting-angular';
  driver: VisualScriptingEditorDriverInterface;

  constructor(
    private electronService: ElectronService,
    private opentracingService: VisualScriptingOpentracingService,
  )
  {
    this.driver = new VisualScriptingElectrongDriverService(electronService);
  }

  ngOnInit(): void {
    this.driver.getSettings().getOpentracingSettings()
      .then(options => {
        if (options) {
          this.opentracingService.createTracer(options, "visual-scripting.angular");
        }
      })
      .catch(console.log);
  }

}
