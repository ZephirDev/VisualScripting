import { ProjectInterface } from 'visual-scripting-common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VisualScriptingEditorProjectService {
  private projectInterface: ProjectInterface|null = null;

  constructor()
  {}


}
