import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CompanyService } from 'src/app/services/company.service';
import { ProjectService } from 'src/app/services/project.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'pyu-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.scss'],
})
export class AddProjectModalComponent implements OnInit {

  parentId: number;
  statuses: [];
  statusTemplates: [];
  companyId: number;
  companyMembers: [];


  addProjectForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
    description: new FormControl('', Validators.required),
    statusId: new FormControl('', [Validators.required]),
    managers: new FormControl([]),
    members: new FormControl([]),
    // priority: new FormControl('', [Validators.required]),
    templateId: new FormControl('', [Validators.required]),
  });
  //prefix,companyId,parentId

  constructor(
    public bsModalRef: BsModalRef,
    private companyService: CompanyService,
    private projectService: ProjectService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.companyService.getStatusTemplates(this.companyId).subscribe((resp) => {
      this.statusTemplates = resp.data;
    });

    this.companyService.getMembers(this.companyId).subscribe((resp) => {
      console.log(resp.data);
      this.companyMembers = resp.data;
    });
  }

  addProject() {
    console.log("Add clicked");
    this.projectService.add({
      title: this.title.value,
      description: this.description.value,
      prefix: "TST", //TODO hardcoding
      statusId: +this.statusId.value,
      parentId: this.parentId,
      members: this.members.value,
      companyId: this.companyId,
      templateId: +this.templateId.value
    }).subscribe((resp) => {
      this.toastr.success('Success', 'Task has been added');
      this.projectService.emitProjectAdded(resp.data);
      this.bsModalRef.hide();
    });
  }

  get title() {
    return this.addProjectForm.get('title');
  }

  get description() {
    return this.addProjectForm.get('description');
  }

  get statusId() {
    return this.addProjectForm.get('statusId');
  }

  get managers() {
    return this.addProjectForm.get('managers');
  }

  get members() {
    return this.addProjectForm.get('members');
  }

  get priority() {
    return this.addProjectForm.get('priority');
  }

  get templateId() {
    return this.addProjectForm.get('templateId');
  }

}
