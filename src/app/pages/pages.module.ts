import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
  ],
  imports: [PagesRoutingModule],
  exports: [],
  providers: [],
})
export class PagesModule { }
