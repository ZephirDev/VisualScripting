import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VisualScriptingEditorUiService {
  private loading: boolean = false;

  constructor()
  {}

  setLoading(loading: boolean)
  {
    this.loading = loading;
  }

  isLoading(): boolean
  {
    return this.loading;
  }

}
