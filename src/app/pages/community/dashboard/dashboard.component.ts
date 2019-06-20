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
import { swiperConfig } from './swiper.config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  project: any;
  errorMessage: string;
  bsModalRef: BsModalRef;
  unsubscriber$ = Subscription.EMPTY;
  swiperConfig = swiperConfig;
  visibleSidebar = false;
  selectedTaskId: number;
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
      projectId: this.project.id,
      statuses: this.project.statuses
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
  }

  ngOnDestroy() {
    this.unsubscriber$.unsubscribe();
  }
}
