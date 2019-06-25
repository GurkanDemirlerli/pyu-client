import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import {
  SwiperDirective
} from 'ngx-swiper-wrapper';
import { Subscription } from 'rxjs';
import { MenuService } from 'src/app/layout/services/menu.service';
import { faChevronLeft, faChevronRight, faColumns, faFilter, faPlus, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddTaskModalComponent } from 'src/app/theme/components/add-task-modal/add-task-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { swiperConfig } from '../swiper.config';

@Component({
  selector: 'pyu-sub-project',
  templateUrl: './sub-project.component.html',
  styleUrls: ['./sub-project.component.scss']
})
export class SubProjectComponent implements OnInit, AfterViewInit, OnDestroy {
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

  brItems = [];

  @ViewChild(SwiperDirective, { static: false }) swiperRef?: SwiperDirective;

  constructor(
    private menuService: MenuService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log("CONSTRUCTOR CALISTI");
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

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
    console.log("NGONINIT CALISTI");
    const resolvedData = this.route.snapshot.data['resolvedData'];
    this.errorMessage = resolvedData.error;
    this.onDataRetrieved(resolvedData.project);
    this.brItems.push({ text: this.project.assignedTask.title, rt: `/community/2/sub-project/${this.project.id}` });
    this.fillBrs(this.project);
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

  fillBrs(sbp) {
    if (sbp.assignedTask.project.projectType === 0) {
      this.brItems.push({ text: sbp.assignedTask.project.rootProject.title, rt: `/community/2/root-project/${sbp.assignedTask.project.rootProject.id}` });
      this.brItems = this.brItems.reverse();
      return;
    }
    this.brItems.push({ text: sbp.assignedTask.project.subProject.assignedTask.title, rt: `/community/2/sub-project/${sbp.assignedTask.project.subProject.id}` });
    this.fillBrs(sbp.assignedTask.project.subProject);
  }
}
