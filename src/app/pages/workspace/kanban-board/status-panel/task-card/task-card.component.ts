import { Component, OnInit } from '@angular/core';
import { faBolt, faChevronDown, faComments, faCodeBranch, faClock } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'pyu-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {


  icons = {
    faBolt,
    faChevronDown,
    faComments,
    faCodeBranch,
    faClock
  }

  constructor() { }

  ngOnInit() {
  }
}
