import { MenuService } from './services/menu.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { TreeModule } from 'angular-tree-component';
import { ContextMenuModule } from 'ngx-contextmenu';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SideMenuComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    TreeModule.forRoot(),
    ContextMenuModule.forRoot()
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SideMenuComponent
  ],
  providers: [
    MenuService
  ],
})
export class LayoutModule { }
