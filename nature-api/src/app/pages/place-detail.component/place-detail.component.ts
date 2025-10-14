import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaceService } from '../../core/services/place.service';
import { Place } from '../../core/models/place.model';
import * as mapboxgl from 'mapbox-gl';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-place-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.scss']
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
    // pass Mapbox access token via Map constructor options
    this.map = new mapboxgl.Map({
      container: 'mini-map',
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [this.place.longitude, this.place.latitude],
      zoom: 11,
      accessToken: environment.MAPBOX_TOKEN as any
    });

    new mapboxgl.Marker()
      .setLngLat([this.place.longitude, this.place.latitude])
      .setPopup(new mapboxgl.Popup().setHTML(`<b>${this.place.name}</b>`))
      .addTo(this.map);
  }
}
