import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import {
  SwiperDirective
} from 'ngx-swiper-wrapper';
import { Subscription } from 'rxjs';
import { MenuService } from 'src/app/layout/services/menu.service';
import { faChevronLeft, faChevronRight, faColumns, faFilter, faPlus, faChartLine, faFolder, faListAlt } from '@fortawesome/free-solid-svg-icons';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddTaskModalComponent } from 'src/app/theme/components/add-task-modal/add-task-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { swiperConfig } from '../swiper.config';
import { AddStatusTemplateModalComponent } from 'src/app/theme/components/add-status-template-modal/add-status-template-modal.component';
import { TreeNode } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { treeMockData } from './tree-mock.data';
import { CompanyService } from 'src/app/services/company.service';
import { skip } from 'rxjs/operators';
import { AddProjectModalComponent } from 'src/app/theme/components/add-project-modal/add-project-modal.component';

@Component({
  selector: 'pyu-root-project',
  templateUrl: './root-project.component.html',
  styleUrls: ['./root-project.component.scss'],
  // encapsulation: ViewEncapsulation.Native
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
    faChartLine,
    faFolder,
    faListAlt
  }
  visibleTree = true;

  @ViewChild(SwiperDirective, { static: false }) swiperRef?: SwiperDirective;

  constructor(
    private menuService: MenuService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    public toasterService: ToastrService,
    private companyService: CompanyService,
    private router: Router
  ) {

  }

  filesTree2: TreeNode[];
  selectedFile: TreeNode;




  ngOnInit() {
    const resolvedData = this.route.snapshot.data['resolvedData'];
    this.errorMessage = resolvedData.error;
    this.onDataRetrieved(resolvedData.project);
    this.filesTree2 = treeMockData;
    this.companyService.getTree(this.project.company.id).subscribe((resp) => {
      this.filesTree2 = resp.data;
    });

    this.route.params.pipe(skip(1)).subscribe(routeParams => {
      console.log(routeParams);
      const resolvedData = this.route.snapshot.data['resolvedData'];
      this.errorMessage = resolvedData.error;
      this.onDataRetrieved(resolvedData.project);
      this.swiperRef.update();

    });
  }

  ngAfterViewInit() {
    this.menuService.animationStart$.subscribe((x) => {
      for (let i = 0; i < 1000; i = i + 100) {
        setTimeout(() => {
          this.swiperRef.update();
        }, i);
      }
    });
    this.visibleTree = false;
  }

  onDataRetrieved(project: any) {
    this.project = project;
  }

  showAddTaskModal() {
    const initialState = {
      projectId: this.project.id,
      statuses: this.project.statuses,
      projectType: this.project.projectType,
      prId: this.project.id
    };
    this.bsModalRef = this.modalService.show(AddTaskModalComponent, { initialState, class: 'modal-dialog-centered' });
  }


  showAddProjectModal() {
    const initialState = {
      projectId: this.project.id,
      statuses: this.project.statuses,
    };
    this.bsModalRef = this.modalService.show(AddProjectModalComponent, { initialState, class: 'modal-dialog-centered' });
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
    this.bsModalRef = this.modalService.show(AddStatusTemplateModalComponent, { initialState, class: 'modal-dialog-centered' });
  }

  nodeSelect(event) {
    this.router.navigate(['/community/2/root-project/' + event.node.data]);
    this.visibleTree = false;
  }


  nodeUnselect(event) {
  }

}
