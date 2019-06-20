import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pyu-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  @Input() taskId: number;
  constructor() { }

  ngOnInit() {
  }

}
