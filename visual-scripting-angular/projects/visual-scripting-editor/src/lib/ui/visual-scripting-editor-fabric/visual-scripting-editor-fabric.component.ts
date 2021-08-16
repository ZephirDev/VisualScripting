import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FabricControlInterface} from "../../interfaces/fabric-control.interface";
import {fabric} from 'fabric';

@Component({
  selector: 'visual-scripting-editor-fabric',
  templateUrl: './visual-scripting-editor-fabric.component.html',
  styleUrls: ['./visual-scripting-editor-fabric.component.scss']
})
export class VisualScriptingEditorFabricComponent implements OnInit {
  @Input()
  control: FabricControlInterface;

  @ViewChild('visual_scripting_editor_fabric_container', { static: true })
  container: ElementRef<HTMLDivElement>|null;

  @ViewChild('visual_scripting_editor_fabric', { static: true })
  canvas: ElementRef<HTMLCanvasElement>|null;

  fabricCanvas: fabric.Canvas|null;

  width: number = 200;
  height: number = 200;

  constructor()
  {
    this.control = {
      init: () => {},
    };
    this.container = null;
    this.canvas = null;
    this.fabricCanvas = null;
  }

  ngOnInit(): void
  {
    this.fabricCanvas = new fabric.Canvas(this.canvas!.nativeElement, {
      width: window.innerWidth,
      height: window.innerHeight,
    });
    this.fabricCanvas.backgroundColor = '#AAAAEE';
    let circle = new fabric.Circle({
      radius: 20, fill: 'green', left: 100, top: 100
    });
    this.fabricCanvas.add(circle);
    this.fabricCanvas.renderAll();
  }

  resize()
  {
    this.fabricCanvas!.setWidth(window.innerWidth);
    this.fabricCanvas!.setHeight(window.innerHeight);
  }

}
