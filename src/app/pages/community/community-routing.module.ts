import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityComponent } from './community.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlaygroundComponent } from './playground/playground.component';
import { ProjectResolver } from 'src/app/resolvers/project-resolver';

const routes: Routes = [
  {
    path: '',
    component: CommunityComponent,
    children: [{
      path: 'project/:id',
      component: DashboardComponent,
      resolve: { resolvedData: ProjectResolver }
    }, {
      path: 'playground',
      component: PlaygroundComponent
    },{

    }]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule { }
