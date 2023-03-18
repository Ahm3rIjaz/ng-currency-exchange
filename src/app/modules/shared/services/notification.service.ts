import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {
  constructor(
    private _snackBar: MatSnackBar
  ) { }
  
  show(
    message: string,
  ): void {
    this._snackBar.open(message)
  }
}