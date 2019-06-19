import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
@Component({
  selector: 'pyu-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss']
})
export class AddTaskModalComponent implements OnInit {

  projectId: number;
  statuses: [];

  addTaskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
    description: new FormControl('', Validators.required),
    statusId: new FormControl('', [Validators.required]),
  });

  constructor(public bsModalRef: BsModalRef, private taskService: TaskService) { }

  ngOnInit() {
    console.log(this.statuses);
  }

  addTask() {
    this.taskService.add({
      title: this.title.value,
      description: this.description.value,
      statusId: +this.statusId.value,
      projectId: this.projectId
    }).subscribe((resp) => {
      console.log("OK");
    })
  }

  get title() {
    return this.addTaskForm.get('title');
  }

  get description() {
    return this.addTaskForm.get('description');
  }

  get statusId() {
    return this.addTaskForm.get('statusId');
  }

}
