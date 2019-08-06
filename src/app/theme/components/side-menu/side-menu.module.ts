import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { TreeModule } from 'angular-tree-component';
import { ContextMenuModule } from 'ngx-contextmenu';
import { SideMenuComponent } from './side-menu.component';

@NgModule({
  declarations: [
    SideMenuComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    TreeModule.forRoot(),
    ContextMenuModule.forRoot(),
  ],
  exports: [
    SideMenuComponent,
  ],
  providers: [
  ],
})
export class SideMenuModule { }
