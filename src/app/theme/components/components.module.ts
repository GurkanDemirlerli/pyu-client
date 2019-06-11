import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { TaskCardComponent } from './task-card/task-card.component';

@NgModule({
  declarations: [
    TaskCardComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: [
    TaskCardComponent
  ],
  providers: [
  ],
})
export class ComponentsModule { }
