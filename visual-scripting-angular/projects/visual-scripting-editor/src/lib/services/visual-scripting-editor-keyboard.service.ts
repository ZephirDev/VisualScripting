import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VisualScriptingEditorKeyboardService {
  private keys: {[key: number]: boolean};

  constructor() {
    this.keys = {};
  }

  handle(event: KeyboardEvent, press: boolean)
  {
    console.log(event.keyCode, press);
    if (press) {
      this.keys[event.keyCode] = true;
    } else {
      delete this.keys[event.keyCode];
    }
  }

  isPress(keyCode: number): boolean
  {
    return this.keys[keyCode] == true;
  }
}
