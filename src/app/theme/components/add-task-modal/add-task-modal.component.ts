import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { ProjectService } from 'src/app/services/project.service';
import { ToastrService } from 'ngx-toastr';
import { SubProjectService } from 'src/app/services/sub-project.service';
@Component({
  selector: 'pyu-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss']
})
export class AddTaskModalComponent implements OnInit {
  isCollapsed = true;
  projectId: number;
  projectType: number;
  prId: number;
  statuses = [];
  members = [];

  priorities = [
    { value: 0, text: "Extremely Low" },
    { value: 1, text: "Ultra Low" },
    { value: 2, text: "Very Low" },
    { value: 3, text: "Low" },
    { value: 4, text: "Medium" },
    { value: 5, text: "High" },
    { value: 6, text: "Very High" },
    { value: 7, text: "Ultra High" },
    { value: 8, text: "Extremely High" },
  ];

  // @Output() onTaskInserted: EventEmitter<any> = new EventEmitter();

  addTaskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
    description: new FormControl('', Validators.required),
    statusId: new FormControl('', [Validators.required]),
    assignees: new FormControl([]),
    priority: new FormControl('4', [Validators.required])
  });

  constructor(
    public bsModalRef: BsModalRef,
    private taskService: TaskService,
    private projectService: ProjectService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    console.log(this.statuses);
    this.projectService.getMembers(this.projectId).subscribe((resp) => {
      console.log(resp.data);
      this.members = resp.data;
      this.addTaskForm.patchValue({ statusId: this.statuses[0].id })
    });

  }

  addTask() {
    this.taskService.add({
      title: this.title.value,
      description: this.description.value,
      statusId: +this.statusId.value,
      projectId: this.projectId,
      assignees: this.assignees.value,
      priority: this.priority.value
    }).subscribe((resp) => {
      this.toastr.success('Success', 'Task has been added');
      this.taskService.emitTaskAdded(resp.data);
      this.bsModalRef.hide();
    });
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

  get assignees() {
    return this.addTaskForm.get('assignees');
  }

  get priority() {
    return this.addTaskForm.get('priority');
  }

}
