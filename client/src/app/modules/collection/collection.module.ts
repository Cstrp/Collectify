import { CollectionRoutingModule } from './collection-routing.module';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { CollectionEffects } from '../../store/collection/collection.effects';
import { CollectionListComponent } from './components/collection-list/collection-list.component';
import { CollectionListItemComponent } from './components/collection-list-item/collection-list-item.component';
import { DetailedCollectionComponent } from './components/detailed-collection/detailed-collection.component';
import { MaterialModule } from '../../shared';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    CollectionListComponent,
    CollectionListItemComponent,
    DetailedCollectionComponent,
    ItemsListComponent,
  ],
  imports: [
    CommonModule,
    CollectionRoutingModule,
    MatSortModule,
    EffectsModule.forFeature([CollectionEffects]),
    MaterialModule,
    NgOptimizedImage,
  ],
})
export class CollectionModule {}
