import { AuthenticationRoutingModule } from './authentication-routing.module';
import { bootstrapGithub, bootstrapGoogle } from '@ng-icons/bootstrap-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent, NgIconsModule } from '@ng-icons/core';
import { MaterialModule } from '../../shared';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  PrivacyComponent,
  SignInFormComponent,
  SignUpFormComponent,
  TermsComponent,
} from './components';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../../store';

@NgModule({
  declarations: [
    SignInFormComponent,
    SignUpFormComponent,
    TermsComponent,
    PrivacyComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    EffectsModule.forFeature([AuthEffects]),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgIconsModule.withIcons({ bootstrapGoogle, bootstrapGithub }),
    NgIconComponent,
  ],
  providers: [],
})
export class AuthenticationModule {}
