import { ProjectInterface, IndexInterface } from 'visual-scripting-common';
import { Injectable } from '@angular/core';
import {Observable, timer} from "rxjs";
import {VisualScriptingEditorDriverService} from "./visual-scripting-editor-driver.service";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class VisualScriptingEditorProjectService {
  private projectInterface: ProjectInterface|null = null;
  private index: IndexInterface;
  private timer: Observable<number>;

  constructor(
      private driverService: VisualScriptingEditorDriverService,
      private messageService: MessageService,
  )
  {
    this.index = {
      types: []
    };
    this.timer = timer(0, 30000);
    this.timer.subscribe(() => {
      if (this.driverService.hasDriver()) {
        return;
      }

      this.driverService.getDriver().getProject().getIndex()
          .then((index) => {
            if (index) {
              this.index = index;
            }
          });
    });
  }

  getProject(): ProjectInterface
  {
    return this.projectInterface!;
  }

  async setProject(project: ProjectInterface): Promise<void>
  {
    await this.clean();
    this.projectInterface = project;
  }

  async clean(): Promise<void>
  {
    this.projectInterface = null;
  }

  hasProject(): boolean
  {
    return this.projectInterface != null;
  }

  getIndex(): IndexInterface
  {
    return this.index;
  }
}
