import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './components';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
          import('../collection').then(m => m.CollectionModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OverviewRoutingModule {}
