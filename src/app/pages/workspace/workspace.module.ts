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

@NgModule({
    declarations: [
        WorkspaceComponent,
        AddFolderFormComponent,
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
        DropdownModule

    ],
    exports: [],
    providers: [],
})
export class WorkspaceModule { }