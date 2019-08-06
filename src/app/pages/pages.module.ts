import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import {
  SwiperModule, SwiperConfigInterface,
  SWIPER_CONFIG
} from 'ngx-swiper-wrapper';
import { AuthComponent } from './auth/auth.component';
import { WorkspaceChoosingComponent } from './workspace-choosing/workspace-choosing.component';


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  observer: true,
  direction: 'horizontal',
  threshold: 50,
  spaceBetween: 5,
  slidesPerView: 1,
  centeredSlides: true
};

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    WorkspaceChoosingComponent,
  ],
  imports: [PagesRoutingModule, SwiperModule],
  exports: [],
  providers: [{
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG
  }],
})
export class PagesModule { }
