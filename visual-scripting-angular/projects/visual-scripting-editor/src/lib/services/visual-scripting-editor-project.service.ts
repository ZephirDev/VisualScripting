import { ProjectInterface } from 'visual-scripting-common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VisualScriptingEditorProjectService {
  private projectInterface: ProjectInterface|null = null;

  constructor()
  {}

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
}
