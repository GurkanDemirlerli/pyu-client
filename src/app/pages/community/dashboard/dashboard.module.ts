import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        FormsModule,
     ],
    exports: [],
    providers: [],
})
export class DashBoardModule {}
