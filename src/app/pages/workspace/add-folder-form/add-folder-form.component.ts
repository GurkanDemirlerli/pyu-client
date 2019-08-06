import { ProjectService } from 'src/app/services/project.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { WorkspaceMemberService } from '../../../services/workspace-member.service';
import { MemberTypes, SubjectTypes } from 'src/app/enums';

@Component({
  selector: 'pyu-add-folder-form',
  templateUrl: './add-folder-form.component.html',
  styleUrls: ['./add-folder-form.component.scss']
})
export class AddFolderFormComponent implements OnInit {
  workspaceMembers;

  displayValue: boolean;
  @Output()
  displayChange = new EventEmitter<boolean>();
  @Input()
  get display() {
    return this.displayValue;
  }
  set display(val) {
    this.displayValue = val;
    this.displayChange.emit(this.displayValue);
  }

  @Input() defaultParent: any;
  @Input() workspaceId: number;
  @Input() defaultType: number;

  @Output() onSubmit = new EventEmitter<any>();

  @Output() onSubjectAdded = new EventEmitter<any>();

  startDate: Date;
  dueDate: Date;
  addFolderForm: FormGroup;
  val1: string = "Project";
  val2: string = "Folder";
  members: SelectItem[] = [];
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, private workspaceMemberService: WorkspaceMemberService, private projectService: ProjectService) { }

  ngOnInit() {
    this.workspaceMemberService.getWorkspaceMembers(this.workspaceId).subscribe((res) => {
      this.workspaceMembers = res.data;
      console.log(res.data);
      this.members = (res.data as any[]).map((x) => {
        let label, value;
        value = x.workspaceMemberId;
        if (x.memberType === MemberTypes.USER)
          label = x.user.account.firstname + " " + x.user.account.lastname;
        else
          label = x.group.name;
        //TODO user veya group haricinde baska bi deger gelirse işle
        return { label, value }
      });
    });

    this.initAddFolderForm();
  }

  initAddFolderForm() {
    this.addFolderForm = this.fb.group({
      name: new FormControl('', Validators.required),
      subjectType: new FormControl('', Validators.required),
      startDate: new FormControl(''),
      dueDate: new FormControl(''),
      sharings: new FormControl(''),
      // parentId: new FormControl('', Validators.required)
    });
    setTimeout(() => {
      this.addFolderForm.get('subjectType').setValue('2');
    }, 0)
  }

  ngAfterViewInit(): void {
    this.addFolderForm.get('subjectType').valueChanges.subscribe((val) => {
      if (val === '2') {
        this.addFolderForm.controls['startDate'].setValidators([Validators.required]);
        this.addFolderForm.controls['startDate'].updateValueAndValidity();

        this.addFolderForm.controls['dueDate'].setValidators([Validators.required]);
        this.addFolderForm.controls['dueDate'].updateValueAndValidity();
      } else {
        this.addFolderForm.controls['startDate'].clearValidators();
        this.addFolderForm.controls['startDate'].updateValueAndValidity();

        this.addFolderForm.controls['dueDate'].clearValidators();
        this.addFolderForm.controls['dueDate'].updateValueAndValidity();
      }
    })
  }

  onAddFolderFormSubmit(v) {
    this.onSubmit.emit({ ...this.addFolderForm.value });
    let form = { ...this.addFolderForm.value, parentId: this.defaultParent.subjectId };
    console.log(form);
    form.startDate = form.startDate.toISOString();
    form.dueDate = form.dueDate.toISOString();
    if (form.subjectType == SubjectTypes.FOLDER) {

    } else if (form.subjectType == SubjectTypes.PROJECT) {
      this.projectService.insert(form).subscribe((res) => {
        console.log("Project Inserted", res);
        this.onSubjectAdded.emit(res.data);
      });
    }
    else {
      //TODO
      console.log("Unhandled Subject Type");
    }

    this.display = false;
  }

  tst() {
    console.log(this.addFolderForm.get('subjectType').value);
  }

  get subjectType() {
    return this.addFolderForm.get('subjectType');
  }

}
