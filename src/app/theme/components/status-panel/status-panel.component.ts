import { Component, OnInit, Input, ElementRef, ViewChild, HostBinding, AfterViewInit, Renderer, ViewChildren, QueryList, DoCheck, OnChanges, HostListener } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'pyu-status-panel',
  templateUrl: './status-panel.component.html',
  styleUrls: ['./status-panel.component.scss']
})
export class StatusPanelComponent implements OnInit, AfterViewInit {
  deviceInfo = null;
  ngAfterViewInit(): void {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();

    if (isMobile || isTablet) {
      let x = this.elRef.nativeElement.querySelectorAll('.ng-scroll-view');
      x[0].style.width = 'calc(100% + 5px)';
    }
  }

  @Input() status: any;

  items = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
  ];
  @ViewChild('wrapper', { static: false }) wrapperEl: ElementRef;

  constructor(private elRef: ElementRef, private renderer: Renderer, private deviceService: DeviceDetectorService) { }

  swipeLeft() {
    let amount = this.wrapperEl.nativeElement.offsetWidth;
    this.renderer.setElementStyle(this.elRef.nativeElement, 'margin-left', '-' + amount + 'px');
  }

  swipeRight() {
    let amount = this.wrapperEl.nativeElement.offsetWidth;
    this.renderer.setElementStyle(this.elRef.nativeElement, 'margin-left', amount + 'px');
  }

  ngOnInit() {
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
  }
}
