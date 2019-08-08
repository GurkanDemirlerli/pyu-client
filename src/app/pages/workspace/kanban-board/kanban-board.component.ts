import { ActivatedRoute } from '@angular/router';
import { SubjectService } from './../../../services/subject.service';
import { swiperConfig } from './swiper.config';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList, NgZone, OnDestroy, Renderer, Input, Output, EventEmitter, Self, SimpleChanges, SimpleChange, HostListener } from '@angular/core';
import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface
} from 'ngx-swiper-wrapper';
import { StatusPanelComponent } from 'src/app/theme/components/status-panel/status-panel.component';
import { Subject, Subscription } from 'rxjs';
import { NgScrollbar } from 'ngx-scrollbar';
import { MenuService } from 'src/app/layout/services/menu.service';
import { faChevronLeft, faChevronRight, faColumns, faFilter, faPlus, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { ElementQueries, ResizeSensor } from 'css-element-queries';


@Component({
  selector: 'pyu-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {

  public swiperConfig = swiperConfig;
  dissco = false;
  public show: boolean = true;
  public type: string = 'directive';

  public disabled: boolean = false;
  icons = {
    faChevronLeft,
    faChevronRight,
    faColumns,
    faFilter,
    faPlus,
    faChartLine
  }

  @ViewChildren('statusHeader') statusHeaderEl: QueryList<ElementRef>;
  @ViewChild('statusList', { static: false }) statusListEl: ElementRef;
  @ViewChild('top', { static: false }) topEl: ElementRef;

  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective, { static: false }) directiveRef?: SwiperDirective;
  @ViewChildren(StatusPanelComponent) statusPanelRefs: QueryList<StatusPanelComponent>;
  @ViewChild(NgScrollbar, { static: false }) scrollbarRef: NgScrollbar;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isViewInit = true;
    let width = this.statusListEl.nativeElement.offsetWidth;
    console.log("width", width);
    let spv = Math.round(width / 320);
    this.swiperConfig = { ...this.swiperConfig, slidesPerView: spv };
    this.directiveRef.update();
  }


  workflowValue: any;
  @Input()
  get workflow() {
    return this.workflowValue;
  }
  set workflow(val) {
    this.workflowValue = val;
    if (this.isViewInit) {
      this.directiveRef.update();
    }
  }

  menuSizeValue: any;
  @Input()
  get menuSize() {
    return this.menuSizeValue;
  }
  set menuSize(val) {
    //HARD-CODING
    this.menuSizeValue = val;
    if (this.isViewInit) {
      let width = this.statusListEl.nativeElement.offsetWidth;
      console.log("width", width);
      let spv = Math.round(width / 312);
      this.swiperConfig = { ...this.swiperConfig, slidesPerView: spv };
      this.directiveRef.update();
      console.log("SPV", spv);
    }
    console.log("isViewInit", this.isViewInit);
  }

  isViewInit: boolean;

  @Input() subjects;

  constructor(
    private ngZone: NgZone,
    private menuService: MenuService,
    private renderer: Renderer,
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    @Self() private element: ElementRef
  ) { }


  ngAfterViewInit() {
    this.isViewInit = true;
    let width = this.statusListEl.nativeElement.offsetWidth;
    console.log("width", width);
    let spv = Math.round(width / 320);
    this.swiperConfig = { ...this.swiperConfig, slidesPerView: spv };
    this.directiveRef.update();
  }

  // ngDoCheck() {
  //   if (this.isViewInit) {
  //     let width = this.statusListEl.nativeElement.offsetWidth;
  //     console.log("width", width);
  //     let spv = Math.round(width / 312);
  //     this.swiperConfig = { ...this.swiperConfig, slidesPerView: spv };
  //     this.directiveRef.update();
  //     console.log("SPV", spv);
  //   }
  // }

  ngOnInit() {

  }

  public onIndexChange(index: number): void {
    console.log('Swiper index: ', index);
  }

  public onSwiperEvent(event: string): void {
    console.log('Swiper event: ', event);
  }

}
