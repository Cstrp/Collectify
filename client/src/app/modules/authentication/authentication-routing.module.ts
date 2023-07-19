import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  PrivacyComponent,
  SignInFormComponent,
  SignUpFormComponent,
  TermsComponent,
} from './components';

const routes: Routes = [
  { path: 'sign-in', component: SignInFormComponent },
  { path: 'sign-up', component: SignUpFormComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy', component: PrivacyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
