import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../../core/services/place.service';
import { Place } from '../../core/models/place.model';
import * as mapboxgl from 'mapbox-gl';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styles: ['']
})
export class HomeComponent implements OnInit {

  places: Place[] = [];
  map!: mapboxgl.Map;

  constructor(private placeService: PlaceService) {}

  ngOnInit(): void {
    this.loadMap();
    this.loadPlaces();
  }

  loadMap(): void {
    (mapboxgl as any).accessToken = "pk.eyJ1IjoianVhbmZyOTciLCJhIjoiY2x4cnhqZGZpMWUzdTJrb2Qxd2k5Z3huYSJ9.Kp99lB1snn3xzzi26jKy4w";
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-102.5528, 23.6345],
      zoom: 5
    });
  }

  loadPlaces(): void {
    this.placeService.getPlaces().subscribe(data => {
      this.places = data;
      this.addMarkers();
    });
  }

  addMarkers(): void {
    this.places.forEach(place => {
      new mapboxgl.Marker()
        .setLngLat([place.longitude, place.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(`<b>${place.name}</b><br>${place.category}`))
        .addTo(this.map);
    });
  }
}
