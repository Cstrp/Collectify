import { NgModule } from '@angular/core';
import {
  DialogCollectionFormComponent,
  DialogComponent,
  HeaderComponent,
  MenuComponent,
  ParticlesComponent,
} from './components';
import { TopicEffects } from '../store/topic';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules';
import { NgParticlesModule } from 'ng-particles';
import { AppLayoutComponent, AuthLayoutComponent } from './layouts';
import { NgSelectModule } from '@ng-select/ng-select';
import { DialogCollectionItemFormComponent } from './components/dialog-collection-item-form/dialog-collection-item-form.component';

@NgModule({
  declarations: [
    ParticlesComponent,
    HeaderComponent,
    AppLayoutComponent,
    AuthLayoutComponent,
    MenuComponent,
    DialogComponent,
    DialogCollectionFormComponent,
    DialogCollectionItemFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgSelectModule,
    EffectsModule.forFeature([TopicEffects]),
    NgParticlesModule,
  ],
  exports: [
    ParticlesComponent,
    HeaderComponent,
    DialogComponent,
    AppLayoutComponent,
    AuthLayoutComponent,
    DialogComponent,
    DialogCollectionFormComponent,
  ],
})
export class SharedModule {}
