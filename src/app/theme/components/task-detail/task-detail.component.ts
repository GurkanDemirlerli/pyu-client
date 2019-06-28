import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { faBolt, faChevronDown, faComments, faCodeBranch, faClock, faChevronCircleDown, faChevronUp, faChevronCircleUp, faAngleDoubleUp, faAngleDoubleDown, faAngleUp, faAngleDown, faAngleRight, faColumns } from '@fortawesome/free-solid-svg-icons';
import { TaskPriorities, TaskPrioritiesReverse } from 'src/app/enums/task-priorities.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'pyu-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  task: any;
  loading = true;

  icons = {
    faBolt,
    faChevronDown,
    faComments,
    faCodeBranch,
    faClock,
    faColumns
  }

  pricons = [faChevronCircleDown, faChevronDown, faAngleDoubleDown, faAngleDown, faAngleRight, faAngleUp, faAngleDoubleUp, faChevronUp, faChevronCircleUp];

  public taskPriorities = TaskPriorities;
  public taskPrioritiesReverse = TaskPrioritiesReverse;



  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
    this.taskService.selectedTaskId$.subscribe((taskId) => {
      this.loading = true;
      if (taskId !== null) {
        this.taskService.get(taskId).subscribe((resp) => {
          this.task = resp.data;
          console.log("Bu task", this.task);
          this.loading = false;
          console.log("OK", this.loading);
        });
      }
    });
  }

  //TODO communityidyi duzenle
  showProject() {
    this.router.navigate(['/community/2/sub-project/' + this.task.subProject.id]);
  }

  // convertToProject() {
  //   this.taskService.convertToProject(this.task.id, model).subscribe((resp) => {
  //
  //   });
  // }
}
