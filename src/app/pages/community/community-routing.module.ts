import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityComponent } from './community.component';
import { PlaygroundComponent } from './playground/playground.component';
import { ProjectResolver } from 'src/app/resolvers/project-resolver';
import { SubProjectResolver } from 'src/app/resolvers/sub-project-resolver';
import { RootProjectComponent } from './root-project/root-project.component';
import { SubProjectComponent } from './sub-project/sub-project.component';

const routes: Routes = [
  {
    path: '',
    component: CommunityComponent,
    children: [
      //   {
      //   path: '',
      //   component: DashboardComponent,
      //   resolve: { resolvedData: ProjectResolver }
      // },
      {
        path: 'root-project/:id',
        component: RootProjectComponent,
        resolve: { resolvedData: ProjectResolver }
      }, {
        path: 'sub-project/:id',
        component: SubProjectComponent,
        resolve: { resolvedData: SubProjectResolver }
      }, {
        path: 'playground',
        component: PlaygroundComponent
      }, {

      }]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule { }
