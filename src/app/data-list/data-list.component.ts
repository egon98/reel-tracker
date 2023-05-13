import {Component, OnInit, ViewChild} from '@angular/core';
import {combineLatest, map, Observable, of} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {FishingData} from "../fishing-data.model";
import {MatTableDataSource} from "@angular/material/table";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {MatDialog} from "@angular/material/dialog";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {DialogOnDeleteRowComponent} from "../dialog-on-delete-row/dialog-on-delete-row.component";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit{
  images: any;
  @ViewChild(MatPaginator) paginator: any
  @ViewChild(MatSort) sort: any;
  fishing_data: FishingData[] = [];
  public displayedColumns: string[] = ['fishing_spot', 'fish_weight', 'bait_name', 'date', 'editBtn'];
  public obj: any;
  public fishing_datas;
  public dataSource = new MatTableDataSource<FishingData>();
  asd = of(this.fishing_data);
  constructor(private storage: AngularFireStorage,private firestore: AngularFirestore, private dialog: MatDialog, private announcer: LiveAnnouncer) {
    this.fishing_datas = firestore.collection('fishing_data').valueChanges()
  }

  ngOnInit() {
    this.getImages();
    this.getFishingData();
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() => this.dataSource.sort = this.sort);
  }

  getFishingData() {
    this.firestore.collection('fishing_data').valueChanges().subscribe((res: any[]) => {
      this.dataSource.data = res;
    })
    // return this.firestore.collection('Patients').snapshotChanges();
  }
  getImages(): Observable<Observable<readonly unknown[]>> {
    const imagesRef = this.storage.ref('images'); // Replace 'images' with the desired storage path
    return imagesRef.listAll().pipe(
      map((res) => {
        const images = res.items.map((item) => item.getDownloadURL());
        return combineLatest(images);
      })
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  dialogOpen(row: FishingData, event:any) {
    const dialog = this.dialog.open(DialogComponent, {
      width: '350px',
      disableClose: true,
      data: row
    });
    dialog.afterClosed().subscribe(res => {

      if(row.date !== res.date.toISOString().split('T')[0]) {
        res.date.setMinutes(res.date.getMinutes() - res.date.getTimezoneOffset());
        res.date = res.date.toISOString().split('T')[0]
      }

      if(res) {

        this.dataSource.data[res.position - 1] = res;
        this.dataSource._updateChangeSubscription();
        if(res.fishing_spot !== '') {
          this.firestore.collection('fishing_data').doc(row.id).update({
            fishing_spot: res.fishing_spot,
            fish_weight: res.fish_weight,
            bait_name: res.bait_name,
            date: res.date
          })
        }
        res.date.setMinutes(res.date.getMinutes() - res.date.getTimezoneOffset());
        this.firestore.collection('fishing_data').doc(row.id).update({
          date: res.date.toISOString().split('T')[0]
        })
      }
    });
  }

  deleteRowData(row: FishingData, event: any) {
    const dialog = this.dialog.open(DialogOnDeleteRowComponent, {
      width: '400px',
      height: '190px',
      disableClose: true
    });

    dialog.afterClosed().subscribe(res => {
      this.firestore.collection('fishing_data').doc(row.id).delete()
    });
  }

  announceSortChange(sortState: Sort) {
    if(sortState.direction) {
      this.announcer.announce('Sorted ${sortState.direction}ending');
    } else {
      this.announcer.announce('Sorting cleared');
    }
  }

}
