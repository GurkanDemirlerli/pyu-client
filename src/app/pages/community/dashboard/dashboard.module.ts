import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import {
  SwiperModule, SwiperConfigInterface,
  SWIPER_CONFIG
} from 'ngx-swiper-wrapper';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ComponentsModule } from 'src/app/theme/components/components.module';
import { NgScrollbarModule } from 'ngx-scrollbar';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  // observer: true,
  // direction: 'horizontal',
  // threshold: 50,
  // spaceBetween: 5,
  // slidesPerView: 1,
  // centeredSlides: true
};


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    SwiperModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    DragDropModule,
    ComponentsModule,
    NgScrollbarModule
  ],
  exports: [],
  providers: [{
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG
  }],
})
export class DashBoardModule { }
