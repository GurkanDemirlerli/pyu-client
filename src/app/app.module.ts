import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './interceptors/httpconfig.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { AddTaskModalComponent } from './theme/components/add-task-modal/add-task-modal.component';
import { AddStatusTemplateModalComponent } from './theme/components/add-status-template-modal/add-status-template-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddProjectModalComponent } from './theme/components/add-project-modal/add-project-modal.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { AccordionModule } from 'primeng/accordion';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  declarations: [
    AppComponent,
    AddTaskModalComponent,
    AddStatusTemplateModalComponent,
    AddProjectModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DeviceDetectorModule.forRoot(),
    ToastrModule.forRoot(),
    HttpClientModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BsDropdownModule.forRoot(),
    FontAwesomeModule,
    PanelMenuModule,
    DragDropModule,
    AngularDraggableModule,
    AccordionModule,
    CollapseModule.forRoot(),
  ],
  entryComponents: [AddTaskModalComponent, AddStatusTemplateModalComponent, AddProjectModalComponent],
  providers: [
    BsModalRef,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
