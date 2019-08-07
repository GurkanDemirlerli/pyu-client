import { ActivatedRoute } from '@angular/router';
import { SubjectService } from './../../../services/subject.service';
import { swiperConfig } from './swiper.config';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList, NgZone, OnDestroy, Renderer, Input, Output, EventEmitter, Self, SimpleChanges, SimpleChange } from '@angular/core';
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
  public slides = [
    'First slide',
    'Second slide',
    'Third slide',
    'Fourth slide',
    'Fifth slide',
    'Sixth slide'
  ];
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


  workflowValue: any;
  @Input()
  get workflow() {
    return this.workflowValue;
  }
  set workflow(val) {
    this.workflowValue = val;
    if (this.isViewInit) {
      this.directiveRef.update();
      console.log("Resized");
    }
    console.log("isViewInit", this.isViewInit);
    console.log("workflow set");
  }

  menuSizeValue: any;
  @Input()
  get menuSize() {
    return this.menuSizeValue;
  }
  set menuSize(val) {
    this.menuSizeValue = val;
    if (this.isViewInit) {
      this.directiveRef.update();
      console.log("RemenuSized");
    }
    console.log("isViewInit", this.isViewInit);
    console.log("menuSize set");
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
    this.directiveRef.update();
  }

  ngOnInit() {

  }

  public onIndexChange(index: number): void {
    console.log('Swiper index: ', index);
  }

  public onSwiperEvent(event: string): void {
    console.log('Swiper event: ', event);
  }

}
