import { SnackBarService } from '../../../../shared/services';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../../services';
import { Observable, Subscription, take } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  selectError,
  selectIsAuth,
  signInStart,
  State,
} from '../../../../store';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
})
export class SignInFormComponent implements OnInit, OnDestroy {
  public signInForm!: FormGroup;
  public show = false;

  private signSub: Subscription = new Subscription();
  private isAuth$: Observable<boolean> = this.store.select(selectIsAuth);
  private err$: Observable<HttpErrorResponse | null> =
    this.store.select(selectError);

  get f(): { [key: string]: AbstractControl } {
    return this.signInForm.controls;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthenticationService,
    private readonly store: Store<State>,
    private readonly snackService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.init();
    this.handleAuthentication();
  }

  ngOnDestroy(): void {
    this.signSub.unsubscribe();
  }

  public loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  public loginWithGithub() {
    this.authService.loginWithGithub();
  }

  public onSubmit() {
    if (this.signInForm.invalid) return;

    this.store.dispatch(signInStart({ user: this.signInForm.value }));
  }

  private handleAuthentication() {
    this.signSub.add(
      this.err$.subscribe(err => {
        if (err) {
          this.snackService.open(err.error.message);
        }
      })
    );

    this.signSub.add(
      this.isAuth$.pipe(take(1)).subscribe(isAuth => {
        if (isAuth) {
          this.signInForm.reset();
        }
      })
    );
  }

  private init() {
    this.signInForm = this.fb.group({
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
