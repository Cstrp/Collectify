import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private config: MatSnackBarConfig = {
    duration: 10000,
    verticalPosition: 'bottom',
    horizontalPosition: 'right',
    panelClass: 'transparent-snackbar',
  };
  constructor(private readonly snackBar: MatSnackBar) {}

  public open(message: string, action?: string) {
    this.snackBar.open(message, action ? action : 'Close', this.config);
  }
}
