import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MapGeocoder} from "@angular/google-maps";
import Animation = google.maps.Animation;
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {uid} from "chart.js/helpers";

export type Maps = typeof google.maps;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  @ViewChild('search')
  public searchElementRef!: ElementRef;

  map: any;
  markerId = 0;
  display: any;
  center: google.maps.LatLngLiteral = {lat:47.0734457, lng:19.0177231};
  zoom = 7;
  markerOptions: google.maps.MarkerOptions = {draggable: true, animation: Animation.DROP};
  markerPositions: Observable<any> = this.afs.collection('map_markers').valueChanges();

  constructor(geocoder: MapGeocoder, public afs: AngularFirestore) {
    geocoder.geocode({
      //location: this.markerPositions.pop()
    }).subscribe(({results}) => {
      console.log(results);
    })
  }
  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      console.log(position.coords);
    });
  }

  onMove(event: google.maps.MapMouseEvent) {
    if(event.latLng !== null) {
      this.display = (event.latLng.toJSON());
    }
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if(event.latLng !== null) {
      //this.markerPositions.push(event.latLng.toJSON());
      this.afs.collection('map_markers').add({
        id: uid(),
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      })
      console.log(this.markerPositions)
      this.markerId++;
      console.log(this.markerId);
    }
  }

  removeMarker() {
    //this.markerPositions.pop();
    this.markerId--;
  }



































}
