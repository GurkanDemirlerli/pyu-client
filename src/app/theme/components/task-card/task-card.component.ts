import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { faBolt, faChevronDown, faComments, faCodeBranch, faClock, faChevronCircleDown, faChevronUp, faChevronCircleUp,faAngleDoubleUp,faAngleDoubleDown,faAngleUp,faAngleDown,faAngleRight, faColumns} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pyu-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input() task: any;
  @Output() onTaskSelected: EventEmitter<any> = new EventEmitter();
  @HostBinding('style.animation') anima = 'none';


  icons = {
    faBolt,
    faChevronDown,
    faComments,
    faCodeBranch,
    faClock,
    faColumns
  }

  pricons = [faChevronCircleDown, faChevronDown, faAngleDoubleDown, faAngleDown, faAngleRight, faAngleUp, faAngleDoubleUp, faChevronUp, faChevronCircleUp];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // if (this.task.isNew) {
    //   this.anima = 'grow .6s';
    //   setTimeout(() => {
    //     this.anima = 'none';
    //   }, 3000);
    // }

  }

  selectTask() {
    this.onTaskSelected.emit(this.task);
  }

}
