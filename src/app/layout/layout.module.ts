import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';

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
    ContextMenuModule.forRoot(),
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    FormsModule,
    RadioButtonModule,
    ReactiveFormsModule,
    MultiSelectModule,
    DropdownModule
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
