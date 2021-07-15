import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisualScriptingEditorModule } from 'visual-scripting-editor';
import { NgxElectronModule } from 'ngx-electron';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VisualScriptingEditorModule,
    NgxElectronModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
