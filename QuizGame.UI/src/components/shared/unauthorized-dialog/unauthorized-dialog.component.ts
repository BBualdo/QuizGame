import { Component, Inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { ErrorsService } from '../../../services/errors.service';

@Component({
  selector: 'app-unauthorized-dialog',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './unauthorized-dialog.component.html',
})
export class UnauthorizedDialogComponent {
  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any,
    private router: Router,
    private errorsService: ErrorsService,
  ) {}

  redirectToLoginPage() {
    this.router.navigate(['/auth/login']);
    this.errorsService.clear();
    this.dialogRef.close();
  }

  close() {
    this.errorsService.clear();
    this.dialogRef.close(false);
  }
}
