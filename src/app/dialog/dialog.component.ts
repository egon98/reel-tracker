import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {HomeComponent} from "../home/home.component";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent{
  fishing_spot: string;
  fish_weight: number;
  bait_name: string;
  date: Date;
  selectedFiles: any;
  imageUrls: string[] = [];

  constructor(public dialog: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private storage: AngularFireStorage
  ) {
    this.fishing_spot = this.data?.fishing_spot;
    this.fish_weight = this.data?.fish_weight;
    this.bait_name = this.data?.bait_name;
    this.date = this.data?.date;
    this.imageUrls = this.data?.imageUrls;
  }

  onFilesSelected(event: any) {
    this.selectedFiles = event.target.files;
  }

  closeDialog() {
    this.dialog.close();
  }

  closeAndSetData() {
    this.dialog.close(MAT_DIALOG_DATA);
  }

  uploadImages() {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      const file = this.selectedFiles[i];
      const filePath = `images/${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      task.snapshotChanges().subscribe(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.imageUrls.push(url);
        });
      });
    }
  }
}
