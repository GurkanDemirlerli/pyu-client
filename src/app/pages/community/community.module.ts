import { CommunityRoutingModule } from './community-routing.module';
import { CommunityComponent } from './community.component';
import { NgModule } from '@angular/core';
import { LayoutModule } from 'src/app/layout/layout.module';
import { DashBoardModule } from './dashboard/dashboard.module';
import { RootProjectModule } from './root-project/root-project.module';
import { SubProjectModule } from './sub-project/sub-project.module';
import { PlaygroundComponent } from './playground/playground.component';
import { ProjectModule } from './project/project.module';


@NgModule({
    declarations: [
        CommunityComponent,
        PlaygroundComponent,
    ],
    imports: [
        DashBoardModule,
        RootProjectModule,
        SubProjectModule,
        ProjectModule,
        CommunityRoutingModule,
        LayoutModule,

    ],
    exports: [],
    providers: [],
})
export class CommunityModule { }
