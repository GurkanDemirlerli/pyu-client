import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList, NgZone, OnDestroy, Renderer } from '@angular/core';
import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface
} from 'ngx-swiper-wrapper';
import { StatusPanelComponent } from 'src/app/theme/components/status-panel/status-panel.component';
import { Subject, Subscription } from 'rxjs';
import { NgScrollbar } from 'ngx-scrollbar';
import { MenuService } from 'src/app/layout/services/menu.service';
import { faChevronLeft, faChevronRight, faColumns, faFilter, faPlus, faChartLine } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {



  dissco = false;
  size$ = new Subject();
  unsubscriber$ = Subscription.EMPTY;
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

  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 5,
    keyboard: true,
    // mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false,
    // grabCursor: true,
    allowTouchMove: true,
    roundLengths: true,
    touchMoveStopPropagation: false,
    spaceBetween: 15,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      900: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      1500: {
        slidesPerView: 4,
        spaceBetween: 10
      },

    }
  };

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

  constructor(private ngZone: NgZone, private menuService: MenuService, private renderer: Renderer) { }

  ngAfterViewInit() {
    this.menuService.animationStart$.subscribe((x) => {
      console.log("AAAA");
      for (let i = 0; i < 1000; i = i + 100) {
        setTimeout(() => {
          this.directiveRef.update();
        }, i);
      }
    });
    // this.renderer.setElementStyle(this.statusListEl.nativeElement, 'height', (this.statusListEl.nativeElement.offsetHeight - this.topEl.nativeElement.offsetHeight)+'px');
  }

  ngOnInit() {

  }

  public onIndexChange(index: number): void {
    console.log('Swiper index: ', index);
  }

  public onSwiperEvent(event: string): void {
    console.log('Swiper event: ', event);
  }

  ngOnDestroy() {
    this.unsubscriber$.unsubscribe();
  }
}
