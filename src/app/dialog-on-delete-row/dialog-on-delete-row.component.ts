import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-on-delete-row',
  templateUrl: './dialog-on-delete-row.component.html',
  styleUrls: ['./dialog-on-delete-row.component.css']
})
export class DialogOnDeleteRowComponent {
  constructor(public dialog: MatDialogRef<DialogOnDeleteRowComponent>) { }
  closeDialog() {
    this.dialog.close();
  }
}
