import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { TaskCardComponent } from './task-card/task-card.component';
import { StatusPanelComponent } from './status-panel/status-panel.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { StatusSummaryBarComponent } from './status-summary-bar/status-summary-bar.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { ProjectCardComponent } from './project-card/project-card.component';

@NgModule({
  declarations: [
    TaskCardComponent,
    StatusPanelComponent,
    StatusSummaryBarComponent,
    TaskDetailComponent,
    ProjectCardComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    DragDropModule,
    NgScrollbarModule,
    ScrollingModule

  ],
  exports: [
    TaskCardComponent,
    StatusPanelComponent,
    StatusSummaryBarComponent,
    TaskDetailComponent
  ],
  providers: [
  ],
})
export class ComponentsModule { }
