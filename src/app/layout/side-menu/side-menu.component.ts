import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SubjectService } from './../../services/subject.service';
import { DomainService } from './../../services/domain.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ContextMenuComponent } from 'ngx-contextmenu';
import {
  faUserLock,
  faBuilding,
  faSchool,
  faMapMarkedAlt,
  faBookOpen,
  faAddressBook,
  faFeather,
  faAdjust,
  faHome,
  faProjectDiagram,
  faCalendarAlt,
  faUndoAlt,
  faUsers,
  faQuestion,
  faExclamationTriangle,
  faColumns,
  faTasks,
  faSearch

} from '@fortawesome/free-solid-svg-icons';
import { ITreeOptions } from 'angular-tree-component';
import { SubjectTypes } from '../../enums';
import { of } from 'rxjs';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})

export class SideMenuComponent implements OnInit {
  startDate: Date;
  dueDate: Date;

  display: boolean = false;

  @ViewChild('tree', { static: true }) tree;

  nodes = [
  ];

  options: ITreeOptions = {
    allowDrag: (node) => node.data.subjectType !== SubjectTypes.DOMAIN,
    allowDrop: (element, { parent, index }) => {
      if (parent.parent === null)
        return false;
      return true;
    },
    idField: 'subjectId',
    displayField: 'name',
    getChildren: this.getChildren.bind(this),
  };

  data = [];

  icons = {
    faUserLock,
    faBuilding,
    faSchool,
    faMapMarkedAlt,
    faBookOpen,
    faHome,
    faProjectDiagram,
    faCalendarAlt,
    faUndoAlt,
    faUsers,
    faQuestion,
    faExclamationTriangle,
    faAddressBook,
    faFeather,
    faAdjust,
    faColumns,
    faTasks,
    faSearch
  }
  constructor(private fb: FormBuilder, private domainService: DomainService, private subjectService: SubjectService) { }

  addFolderForm: FormGroup;

  val1: string = "Project";

  val2: string = "Folder";

  ngOnInit() {
    //HARD-CODING getActiveDomains(3)
    this.nodes = [];
    let nds = [];
    this.domainService.getActiveDomains(3).subscribe((res) => {
      console.log(res.data);
      (res.data as any[]).map((root) => {
        nds.push({
          ...root,
          hasChildren: true
        });
      });
      this.nodes = nds;
    });

    this.cars = [
      { label: 'Audi', value: 'Audi' },
      { label: 'BMW', value: 'BMW' },
      { label: 'Fiat', value: 'Fiat' },
      { label: 'Ford', value: 'Ford' },
      { label: 'Honda', value: 'Honda' },
      { label: 'Jaguar', value: 'Jaguar' },
      { label: 'Mercedes', value: 'Mercedes' },
      { label: 'Renault', value: 'Renault' },
      { label: 'VW', value: 'VW' },
      { label: 'Volvo', value: 'Volvo' },
    ];


    this.initAddFolderForm();


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

  initAddFolderForm() {
    this.addFolderForm = this.fb.group({
      name: new FormControl('', Validators.required),
      subjectType: new FormControl('', Validators.required),
      startDate: new FormControl(''),
      dueDate: new FormControl(''),
      sharings: new FormControl(''),
      parentId: new FormControl('', Validators.required)
    });
    // this.addFolderForm.get('subjectType').patchValue('2', { onlySelf: true });
    setTimeout(() => {
      this.addFolderForm.get('subjectType').setValue('2');
    }, 0)
  }

  onAddFolderFormSubmit(v) {
    console.log(this.addFolderForm.value);
  }

  tst() {
    console.log(this.addFolderForm.get('subjectType').value);
  }

  get subjectType() {
    return this.addFolderForm.get('subjectType');
  }


  @ViewChild(ContextMenuComponent, { static: true }) public basicMenu: ContextMenuComponent;

  showMessage(message: any) {
    console.log(message);
  }

  toggleExpanded(node) {
    if (node.isCollapsed)
      node.expand();
    else
      node.collapse();
  }

  showDialog(e) {
    this.display = true;
  }

  addChildrensToFolders(parentId, arr) {
    var out = []
    for (var i in arr) {
      if (arr[i].parentId == parentId) {
        var children = this.addChildrensToFolders(arr[i].subjectId, arr)

        if (children.length) {
          arr[i].children = children;
        }
        out.push(
          arr[i]
        )
      }
    }
    return out;
  }

  getChildren(node: any) {
    return new Promise((resolve, reject) => {
      this.subjectService.getDescendantsTree(node.data.subjectId).subscribe((res) => {
        let subFolds = res.data.filter(sbj => sbj.subjectType === SubjectTypes.FOLDER || sbj.subjectType === SubjectTypes.PROJECT);
        let tr = this.addChildrensToFolders(node.data.subjectId, subFolds);
        resolve(tr);
      });
    });

  }

  onNodeMove(e) {
    console.log(e);
    this.subjectService.move(e.node.subjectId, e.to.parent.subjectId).subscribe((res) => {
      
    });
  }


  cars: SelectItem[];


}
