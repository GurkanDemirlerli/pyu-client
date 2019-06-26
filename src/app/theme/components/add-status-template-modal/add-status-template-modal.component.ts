import { Component, OnInit } from '@angular/core';
import { faLightbulb, faHourglassStart, faPlay, faCheckDouble, faPlusSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import * as _ from 'lodash';
import { CompanyService } from 'src/app/services/company.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'pyu-add-status-template-modal',
  templateUrl: './add-status-template-modal.component.html',
  styleUrls: ['./add-status-template-modal.component.scss']
})
export class AddStatusTemplateModalComponent implements OnInit {
  selectedTab: number = 0;
  newStatus = "";
  tabs = [
    {
      id: 0,
      text: "PLANNING",
      icon: faLightbulb,
      statuses: []
    },
    {
      id: 1,
      text: "NOT STARTED",
      icon: faPlay,
      statuses: []
    },
    {
      id: 2,
      text: "IN PROGRESS",
      icon: faHourglassStart,
      statuses: []
    },
    {
      id: 3,
      text: "FINISHED",
      icon: faCheckDouble,
      statuses: [{ title: "Done", id: 1 }]
    },
  ];

  companyId: number;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tabs[this.selectedTab].statuses, event.previousIndex, event.currentIndex);
    console.log(this.tabs);
  }

  icons = {
    faLightbulb,
    faPlay,
    faHourglassStart,
    faCheckDouble,
    faPlusSquare,
    faTrashAlt
  }

  constructor(private companyService: CompanyService, public toasterService: ToastrService, public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  addNewStatus() {
    if (this.newStatus != "") {
      let nextId = 1;
      if (this.tabs[this.selectedTab].statuses.length > 0)
        nextId = _.maxBy(this.tabs[this.selectedTab].statuses, 'id').id + 1;
      this.tabs[this.selectedTab].statuses.push({ title: this.newStatus, id: nextId });
      this.newStatus = "";
    }
  }

  deleteStatus(id) {
    this.tabs[this.selectedTab].statuses = this.tabs[this.selectedTab].statuses.filter(x => x.id !== id);
  }

  createTemplate() {
    let statusTemplateModel = {
      name: "Test Template",
      companyId: this.companyId,
      statuses: []
    };

    this.tabs.map((tab, tabindex) => {
      let sts: any = tab.statuses;
      sts = sts.map((x, index) => {
        return {
          title: x.title,
          description: "desc",
          baseStatus: tabindex + 1,
          order: index
        };
      });
      statusTemplateModel.statuses.push(...sts);
    });

    console.log(statusTemplateModel);

    this.companyService.addStatusTemplate(this.companyId, statusTemplateModel).subscribe((resp) => {
      this.toasterService.success("Success", "Template Added", { positionClass: 'toast-top-right' });
      this.bsModalRef.hide();
    });
  }
}
