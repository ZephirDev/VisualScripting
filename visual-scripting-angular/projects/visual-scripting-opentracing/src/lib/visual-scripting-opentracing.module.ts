import {NgModule} from '@angular/core';
import {ToolbarModule} from 'primeng/toolbar';
import {VisualScriptingOpentracingComponent} from './visual-scripting-opentracing.component';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ButtonModule} from "primeng/button";
import {DialogModule} from 'primeng/dialog';
import {AccordionModule} from "primeng/accordion";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    VisualScriptingOpentracingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    AccordionModule,
    HttpClientModule,
  ],
  exports: [
    VisualScriptingOpentracingComponent
  ]
})
export class VisualScriptingOpentracingModule { }
