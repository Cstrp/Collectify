import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCollectionFormComponent } from '../dialog-collection-form/dialog-collection-form.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAuth } from '../../../store';

@Component({
  selector: 'app-dialog',
  template: ` <div *ngIf="isAuthenticated | async">
    <div
      class="fixed bottom-10 right-10 shadow-md shadow-white/50 rounded-full"
      matTooltip="Create new collection"
    >
      <button
        mat-fab
        style="background-color: transparent; color: aliceblue"
        (click)="open()"
      >
        <mat-icon>add</mat-icon>
      </button>
    </div>
  </div>`,
})
export class DialogComponent {
  public isAuthenticated: Observable<boolean> = this.store.select(selectIsAuth);

  constructor(private dialog: MatDialog, private store: Store) {}

  public open() {
    this.dialog.open(DialogCollectionFormComponent, {
      autoFocus: false,
      backdropClass: ['dialog-backdrop'],
      panelClass: ['custom-dialog'],
    });
  }
}
