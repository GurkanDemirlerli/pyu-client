import { RootProjectComponent } from './root-project.component';
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
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {};
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [
    RootProjectComponent,
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
    SidebarModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    BsDropdownModule
  ],
  exports: [],
  providers: [{
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG
  }],
})
export class RootProjectModule { }
