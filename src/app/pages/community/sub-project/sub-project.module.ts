import { SubProjectComponent } from './sub-project.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import {
  SwiperModule,
  SwiperConfigInterface,
  SWIPER_CONFIG
} from 'ngx-swiper-wrapper';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ComponentsModule } from 'src/app/theme/components/components.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SidebarModule } from 'primeng/sidebar';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {};

@NgModule({
  declarations: [
    SubProjectComponent,
  ],
  imports: [
    SwiperModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    DragDropModule,
    ComponentsModule,
    NgScrollbarModule,
    BreadcrumbModule,
    SidebarModule
  ],
  exports: [],
  providers: [{
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG
  }],
})
export class SubProjectModule { }
