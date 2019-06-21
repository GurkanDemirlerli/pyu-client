import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'pyu-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  task: any;
  @Input() taskId: number;
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    if (this.taskId) {
      this.taskService.get(this.taskId).subscribe((resp) => {
        this.task = resp.data;
        console.log(this.task);
      });
    }
  }
}
