import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MapGeocoder, MapInfoWindow, MapMarker} from "@angular/google-maps";
import Animation = google.maps.Animation;
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable, of} from "rxjs";
import * as uuid from "uuid";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {FishingData} from "../fishing-data.model";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {AuthService} from "../auth/auth.service";
import {LoginComponent} from "../auth/login/login.component";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import {MatTableDataSource} from "@angular/material/table";
import {DialogOnDeleteRowComponent} from "../dialog-on-delete-row/dialog-on-delete-row.component";
import {LiveAnnouncer} from "@angular/cdk/a11y";

export type Maps = typeof google.maps;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('search')
  public searchElementRef!: ElementRef;

  map: any;
  markerId = 0;
  display: any;
  center: google.maps.LatLngLiteral = {lat: 47.0734457, lng: 19.0177231};
  zoom = 7;
  markerOptions: google.maps.MarkerOptions = {draggable: true, animation: Animation.DROP};
  markerPositions: Observable<any> = this.afs.collection('map_markers').valueChanges();
  geocoder = new google.maps.Geocoder;
  fishingData: FishingData[] = [];
  user_id: any;

  constructor(geocoder: MapGeocoder, public afs: AngularFirestore, private dialog: MatDialog, public as: AuthService, public afAuth: AngularFireAuth,private firestore: AngularFirestore,private announcer: LiveAnnouncer) {
    this.user_id = sessionStorage.getItem('userId');
  }

  ngOnInit() {

    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  onMove(event: google.maps.MapMouseEvent) {
    if (event.latLng !== null) {
      this.display = (event.latLng.toJSON());
    }
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng !== null) {
      //this.markerPositions.push(event.latLng.toJSON());
      this.afs.collection('map_markers').add({
        userId: sessionStorage.getItem('id'),
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      })
      this.markerId++;
      console.log(
        this.geocoder?.geocode({
          location: event.latLng
        })
      )
    }
  }

  removeMarker() {
    this.markerId--;
  }

  public openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow) {
    infoWindow.open(marker);
  }

  dialogOpen(event: any) {
    const dialog = this.dialog.open(DialogComponent, {
      width: '350px',
      disableClose: true,
    });
    dialog.afterClosed().subscribe(res => {
      this.afs.collection('fishing_data').doc().set({
        fishing_spot: res.fishing_spot,
        fish_weight: res.fish_weight,
        bait_name: res.bait_name,
        date: res.date.toLocaleDateString()
      })
      this.addMarker(event);
      if (res) {
        res.date.setMinutes(res.date.getMinutes() - res.date.getTimezoneOffset());
        this.afs.collection('fishing_data').doc().update({
          date: res.date.toISOString().split('T')[0]
        })
      }
    });
  }
}
