import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './components';
import { MaterialModule, SharedModule } from '../../shared';
import { EffectsModule } from '@ngrx/effects';
import { CollectionEffects } from '../../store/collection/collection.effects';

@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    OverviewRoutingModule,
    SharedModule,
    EffectsModule.forFeature([CollectionEffects]),
    MaterialModule,
  ],
})
export class OverviewModule {}
