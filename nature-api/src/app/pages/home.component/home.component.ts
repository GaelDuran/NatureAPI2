import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../../core/services/place.service';
import { Place } from '../../core/models/place.model';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
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
    (mapboxgl as any).accessToken = 'TU_TOKEN_DE_MAPBOX_AQUI';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-102.5528, 23.6345], // Centro aproximado de México
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
