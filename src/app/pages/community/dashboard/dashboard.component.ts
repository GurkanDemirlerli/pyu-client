import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList, HostListener, NgZone, OnDestroy } from '@angular/core';
import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { StatusPanelComponent } from 'src/app/theme/components/status-panel/status-panel.component';
import { Subject, Subscription } from 'rxjs';
import { NgScrollbar } from 'ngx-scrollbar';
import { MenuService } from 'src/app/layout/services/menu.service';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

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
      480: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 30
      }
    }
  };
  private scrollbar: SwiperScrollbarInterface = {
    el: '.swiper-scrollbar',
    hide: false,
    draggable: true
  };

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false
  };

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog',
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(_event: any) {
  }

  icons = {
    faChevronLeft,
    faChevronRight
  }

  @ViewChildren('statusHeader') statusHeaderEl: QueryList<ElementRef>;
  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective, { static: false }) directiveRef?: SwiperDirective;
  @ViewChildren(StatusPanelComponent) statusPanelRefs: QueryList<StatusPanelComponent>;
  @ViewChild(NgScrollbar, { static: false }) scrollbarRef: NgScrollbar;
  @ViewChild('statusList', { static: false }) statusListEl: ElementRef;


  constructor(private ngZone: NgZone, private menuService: MenuService) { }

  ngAfterViewInit() {
    this.menuService.animationStart$.subscribe((x) => {
      console.log("AAAA");
      for (let i = 0; i < 1000; i = i + 100) {
        setTimeout(() => {
          this.directiveRef.update();
        }, i);
      }
    });
    // this.statusPanelRefs.forEach((cmp) => {
    //   console.log("CMP");
    // });
    // this.scrollbarRef.scrollable.elementScrolled().subscribe((ev) => {
    //   // ev.stopPropagation();
    //   // ev.preventDefault();
    //   // console.log(ev);
    //   console.log("Scrolled");
    //   this.statusPanelRefs.forEach((cmp) => {
    //     const cardWidth = cmp.wrapperEl.nativeElement.offsetWidth;
    //     // console.log(this.scrollbarRef);
    //     console.log(this.statusListEl.nativeElement.scrollLeft);
    //     // this.scrollbarRef.scrollToElement(cardWidth);
    //     // console.log(cmp.wrapperEl.nativeElement.offsetWidth);
    //   })
    // });
  }

  ngOnInit() {

  }
  public toggleType(): void {
    this.type = (this.type === 'component') ? 'directive' : 'component';
  }

  public toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  public toggleDirection(): void {
    this.config.direction = (this.config.direction === 'horizontal') ? 'vertical' : 'horizontal';
  }

  public toggleSlidesPerView(): void {
    if (this.config.slidesPerView !== 1) {
      this.config.slidesPerView = 1;
    } else {
      this.config.slidesPerView = 2;
    }
  }

  public toggleOverlayControls(): void {
    if (this.config.navigation) {
      this.config.scrollbar = false;
      this.config.navigation = false;

      this.config.pagination = this.pagination;
    } else if (this.config.pagination) {
      this.config.navigation = false;
      this.config.pagination = false;

      this.config.scrollbar = this.scrollbar;
    } else {
      this.config.scrollbar = false;
      this.config.pagination = false;

      this.config.navigation = true;
    }

    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.setIndex(0);
    } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.setIndex(0);
    }
  }

  upd() {
    console.log("up");
    this.directiveRef.update();
  }

  public toggleKeyboardControl(): void {
    this.config.keyboard = !this.config.keyboard;
  }

  public toggleMouseWheelControl(): void {
    this.config.mousewheel = !this.config.mousewheel;
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
