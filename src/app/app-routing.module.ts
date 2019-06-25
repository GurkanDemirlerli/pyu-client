import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectiveStrategy } from './selective-strategy.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: './pages/pages.module#PagesModule',
  },
  {
    path: '**', loadChildren: './pages/pages.module#PagesModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
