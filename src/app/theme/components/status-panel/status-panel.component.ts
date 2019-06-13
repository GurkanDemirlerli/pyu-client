import { Component, OnInit, Input, ElementRef, ViewChild, HostBinding, AfterViewInit, Renderer, ViewChildren, QueryList, DoCheck, OnChanges, HostListener } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'pyu-status-panel',
  templateUrl: './status-panel.component.html',
  styleUrls: ['./status-panel.component.scss']
})
export class StatusPanelComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(): void {
    console.log("init");
      let y = (this.wrapperEl.nativeElement.offsetHeight -75)+ 'px';
      this.renderer.setElementStyle(this.listEl.nativeElement, 'height',y);
  }

  @Input() statusId: number;

  items = [
    1, 2, 3, 4, 5, 6, 7, 8
  ];
  @ViewChild('wrapper', { static: false }) wrapperEl: ElementRef;
  @ViewChild('listo', {static:false}) listEl: ElementRef;

  constructor(private elRef: ElementRef, private renderer: Renderer) { }

  swipeLeft() {
    let amount = this.wrapperEl.nativeElement.offsetWidth;
    this.renderer.setElementStyle(this.elRef.nativeElement, 'margin-left', '-' + amount + 'px');
  }

  swipeRight() {
    let amount = this.wrapperEl.nativeElement.offsetWidth;
    this.renderer.setElementStyle(this.elRef.nativeElement, 'margin-left', amount + 'px');
  }

  ngOnInit() {
    console.log(this.statusId);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    console.log(this.wrapperEl);
  }

  msd() {
    console.log("pressed");
  }

}
