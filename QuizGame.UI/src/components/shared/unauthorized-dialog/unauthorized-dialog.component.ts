import { Component, Inject } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { DIALOG_DATA, DialogRef } from "@angular/cdk/dialog";

@Component({
  selector: 'app-unauthorized-dialog',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './unauthorized-dialog.component.html',
})
export class UnauthorizedDialogComponent {

  constructor(private dialogRef:DialogRef, @Inject(DIALOG_DATA) public data:any) {
  }

  redirectToLoginPage() {

  }

  close() {
    this.dialogRef.close();
  }
}
