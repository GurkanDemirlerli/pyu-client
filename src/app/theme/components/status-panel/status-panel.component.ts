import { Component, OnInit, Input, ElementRef, ViewChild, HostBinding, AfterViewInit, Renderer, ViewChildren, QueryList, DoCheck, OnChanges, HostListener, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TaskService } from 'src/app/services/task.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'pyu-status-panel',
  templateUrl: './status-panel.component.html',
  styleUrls: ['./status-panel.component.scss']
})
export class StatusPanelComponent implements OnInit, AfterViewInit {
  deviceInfo = null;
  missions = [];
  items = [];

  @Input() status: any;
  @Output() onTaskSelected: EventEmitter<any> = new EventEmitter();
  @ViewChild('wrapper', { static: false }) wrapperEl: ElementRef;


  constructor(
    private elRef: ElementRef,
    private deviceService: DeviceDetectorService,
    private taskService: TaskService,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.projectService.getSubs({ parentId: this.status.projectId, statusId: this.status.id }).subscribe((res) => {
      this.items = [...res.data, ...this.items];
    });
    this.taskService.getForStatus({ projectId: this.status.projectId, status: this.status.id }).subscribe((res) => {
      this.items = [...this.items, ...res.data];
    });
    this.taskService.addedTask$.subscribe((tsk) => {
      if (tsk && tsk.status.id === this.status.id) {
        tsk.isNew = true;
        this.items.push(tsk);
      }
    })
  }

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

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log(this.items);
    } else {
      const preConData = event.previousContainer.data;
      const conData = event.container.data;
      const preInd = event.previousIndex;
      const curInd = event.currentIndex;

      transferArrayItem(preConData,
        conData,
        preInd,
        curInd);
      let item = this.items[event.currentIndex]
      console.log(this.items[event.currentIndex]);
      this.taskService.changeStatus(item.id, this.status.id).subscribe(() => {
        console.log("OKOKOKOK");
      }, (err) => {
        console.log("EROROROREOR");
        transferArrayItem(conData,
          preConData,
          curInd,
          preInd);
      });

    }
  }

  handleTaskSelected(event) {
    this.onTaskSelected.emit(event);
    this.taskService.emitSelectedTaskId(event.id);
  }

}
