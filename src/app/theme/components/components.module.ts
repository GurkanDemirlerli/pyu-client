import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { TaskCardComponent } from './task-card/task-card.component';
import { StatusPanelComponent } from './status-panel/status-panel.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  declarations: [
    TaskCardComponent,
    StatusPanelComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    DragDropModule,
    NgScrollbarModule,

  ],
  exports: [
    TaskCardComponent,
    StatusPanelComponent
  ],
  providers: [
  ],
})
export class ComponentsModule { }
