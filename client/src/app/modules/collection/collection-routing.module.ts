import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CollectionListComponent } from './components/collection-list/collection-list.component';
import { DetailedCollectionComponent } from './components/detailed-collection/detailed-collection.component';
import { AuthGuard } from '../../shared/guards';
import { ItemsListComponent } from './components/items-list/items-list.component';

const routes: Routes = [
  { path: '', component: CollectionListComponent },
  {
    canActivate: [AuthGuard],
    path: ':id',
    component: DetailedCollectionComponent,
    children: [{ path: 'items', component: ItemsListComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionRoutingModule {}
