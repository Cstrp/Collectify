import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAuth, signUpStart } from '../../../../store/authentication';
import { State } from '../../../../store/reducers/app.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
})
export class SignUpFormComponent implements OnInit, OnDestroy {
  public signUpForm!: FormGroup;
  public show = false;

  private isAuth: Observable<boolean> = this.store.select(selectIsAuth);
  private signUpSub: Subscription = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthenticationService,
    private readonly store: Store<State>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.signUpSub.unsubscribe();
  }

  public onSubmit() {
    if (this.signUpForm.invalid) return;

    this.store.dispatch(signUpStart({ user: this.signUpForm.value }));

    this.signUpSub = this.isAuth.subscribe(value => {
      if (value) {
        this.signUpForm.reset();
        this.router.navigate(['/overview']);
      }
    });
  }

  private init() {
    this.signUpForm = this.fb.group({
      username: [''],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16),
        ],
      ],
    });
  }
}
