import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class PlaceDetailComponent implements OnInit {

  place!: Place;
  map!: mapboxgl.Map;

  constructor(
    private route: ActivatedRoute,
    private placeService: PlaceService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.placeService.getPlaceById(id).subscribe(data => {
      this.place = data;
      this.loadMiniMap();
    });
  }

  loadMiniMap(): void {
    (mapboxgl as any).accessToken = 'TU_TOKEN_DE_MAPBOX_AQUI';
    this.map = new mapboxgl.Map({
      container: 'mini-map',
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [this.place.longitude, this.place.latitude],
      zoom: 11
    });

    new mapboxgl.Marker()
      .setLngLat([this.place.longitude, this.place.latitude])
      .setPopup(new mapboxgl.Popup().setHTML(`<b>${this.place.name}</b>`))
      .addTo(this.map);
  }
}
