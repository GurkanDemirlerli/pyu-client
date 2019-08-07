import { AnalyticsViewComponent } from './analytics-view/analytics-view.component';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceComponent } from './workspace.component';
import { TableViewComponent } from './table-view/table-view.component';
import { GanttViewComponent } from './gantt-view/gantt-view.component';
import { TimelogViewComponent } from './timelog-view/timelog-view.component';

const routes: Routes = [
  {
    path: '',
    component: WorkspaceComponent,
    children: [
      {
        path: 'folder/:folderId/kanban',
        component: KanbanBoardComponent,
      }, {
        path: 'folder/:folderId/table',
        component: TableViewComponent,
      }, {
        path: 'folder/:folderId/gantt',
        component: GanttViewComponent,
      }, {
        path: 'folder/:folderId/timelog',
        component: TimelogViewComponent,
      }, {
        path: 'folder/:folderId/analytics',
        component: AnalyticsViewComponent,
      }]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
