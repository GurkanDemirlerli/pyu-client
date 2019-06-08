import { CommunityRoutingModule } from './community-routing.module';
import { CommunityComponent } from './community.component';
import { NgModule } from '@angular/core';
import { LayoutModule } from 'src/app/layout/layout.module';
import { DashBoardModule } from './dashboard/dashboard.module';


@NgModule({
    declarations: [
        CommunityComponent,
    ],
    imports: [
        DashBoardModule,
        CommunityRoutingModule,
        LayoutModule,

    ],
    exports: [],
    providers: [],
})
export class CommunityModule { }