import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { WorkspaceComponent } from './workspace.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { ResizableModule } from 'angular-resizable-element';
import { SideMenuModule } from '../../theme/components/side-menu/side-menu.module';
import { AddFolderFormComponent } from './add-folder-form/add-folder-form.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { TableViewComponent } from './table-view/table-view.component';
import { GanttViewComponent } from './gantt-view/gantt-view.component';
import { TimelogViewComponent } from './timelog-view/timelog-view.component';
import { AnalyticsViewComponent } from './analytics-view/analytics-view.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TabMenuModule } from 'primeng/tabmenu';
import { StatusPanelComponent } from './kanban-board/status-panel/status-panel.component';
import { TaskCardComponent } from './kanban-board/status-panel/task-card/task-card.component';
import { SWIPER_CONFIG, SwiperConfigInterface, SwiperModule } from 'ngx-swiper-wrapper';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ScrollingModule } from '@angular/cdk/scrolling';
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {};

@NgModule({
    declarations: [
        WorkspaceComponent,
        AddFolderFormComponent,
        KanbanBoardComponent,
        TableViewComponent,
        GanttViewComponent,
        TimelogViewComponent,
        AnalyticsViewComponent,
        StatusPanelComponent,
        TaskCardComponent,
    ],
    imports: [
        SideMenuModule,
        WorkspaceRoutingModule,
        LayoutModule,
        ResizableModule,
        FormsModule,
        CommonModule,
        DialogModule,
        ButtonModule,
        InputTextModule,
        InputTextareaModule,
        CalendarModule,
        FormsModule,
        RadioButtonModule,
        ReactiveFormsModule,
        MultiSelectModule,
        DropdownModule,
        BreadcrumbModule,
        TabMenuModule,
        SwiperModule,
        CommonModule,
        FontAwesomeModule,
        RouterModule,
        DragDropModule,
        NgScrollbarModule,
        ScrollingModule

    ],
    exports: [],
    providers: [{
        provide: SWIPER_CONFIG,
        useValue: DEFAULT_SWIPER_CONFIG
    }],
})
export class WorkspaceModule { }