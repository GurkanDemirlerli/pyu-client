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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    AddTaskModalComponent
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
    BsDropdownModule.forRoot()
  ],
  entryComponents: [AddTaskModalComponent],
  providers: [
    BsModalRef,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
