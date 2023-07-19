import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent, AuthLayoutComponent } from './shared/layouts';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./modules').then(auth => auth.AuthenticationModule),
  },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'overview',
        loadChildren: () =>
          import('./modules').then(overview => overview.OverviewModule),
      },
      {
        path: 'collection',
        loadChildren: () =>
          import('./modules').then(collection => collection.CollectionModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
