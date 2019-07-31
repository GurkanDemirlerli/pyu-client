import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { WorkspaceComponent } from './workspace.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { ResizableModule } from 'angular-resizable-element';

@NgModule({
    declarations: [
        WorkspaceComponent,
    ],
    imports: [
        WorkspaceRoutingModule,
        LayoutModule,
        ResizableModule,
        FormsModule,
        CommonModule
    ],
    exports: [],
    providers: [],
})
export class WorkspaceModule { }