import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import {
  SwiperDirective
} from 'ngx-swiper-wrapper';
import { Subscription } from 'rxjs';
import { MenuService } from 'src/app/layout/services/menu.service';
import { faChevronLeft, faChevronRight, faColumns, faFilter, faPlus, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddTaskModalComponent } from 'src/app/theme/components/add-task-modal/add-task-modal.component';
import { ActivatedRoute } from '@angular/router';
import { swiperConfig } from '../swiper.config';
import { AddStatusTemplateModalComponent } from 'src/app/theme/components/add-status-template-modal/add-status-template-modal.component';

@Component({
  selector: 'pyu-root-project',
  templateUrl: './root-project.component.html',
  styleUrls: ['./root-project.component.scss']
})
export class RootProjectComponent implements OnInit, AfterViewInit, OnDestroy {
  project: any;
  errorMessage: string;
  bsModalRef: BsModalRef;
  unsubscriber$ = Subscription.EMPTY;
  swiperConfig = swiperConfig;
  visibleSidebar = false;
  selectedTaskId: number = null;
  icons = {
    faChevronLeft,
    faChevronRight,
    faColumns,
    faFilter,
    faPlus,
    faChartLine
  }

  @ViewChild(SwiperDirective, { static: false }) swiperRef?: SwiperDirective;

  constructor(
    private menuService: MenuService,
    private modalService: BsModalService,
    private route: ActivatedRoute
  ) { }

  showAddTaskModal() {
    const initialState = {
      projectId: this.project.baseProject.id,
      statuses: this.project.baseProject.statuses,
      projectType: this.project.baseProject.projectType,
      prId: this.project.id
    };
    this.bsModalRef = this.modalService.show(AddTaskModalComponent, { initialState });
  }

  ngAfterViewInit() {
    this.menuService.animationStart$.subscribe((x) => {
      for (let i = 0; i < 1000; i = i + 100) {
        setTimeout(() => {
          this.swiperRef.update();
        }, i);
      }
    });
  }

  ngOnInit() {
    const resolvedData = this.route.snapshot.data['resolvedData'];
    this.errorMessage = resolvedData.error;
    this.onDataRetrieved(resolvedData.project);
  }

  onDataRetrieved(project: any) {
    this.project = project;
  }

  handleTaskSelected(event) {
    this.selectedTaskId = event.id;
    this.visibleSidebar = true;
    console.log(this.selectedTaskId);
  }

  ngOnDestroy() {
    this.unsubscriber$.unsubscribe();
  }

  showAddStatusTemplateModal() {
    const initialState = {
      companyId: this.project.company.id,
    };
    this.bsModalRef = this.modalService.show(AddStatusTemplateModalComponent, { initialState });
  }

}
