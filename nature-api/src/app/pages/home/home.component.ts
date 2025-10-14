import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceService } from '../../services/place.service';
import { Place } from '../../models/place';
import mapboxgl from 'mapbox-gl';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-home',
  template: `
    <div class="page">
      <h2>Inicio — Mapa</h2>
      <div *ngIf="!accessToken" class="token-warning">No Mapbox token found. Set window.__MAPBOX_TOKEN__ in index.html</div>
      <div #mapContainer class="map"></div>
    </div>
  `,
  styles: [
    `.map{height:70vh;width:100%}.marker{font-size:20px}`
  ]
})
export class HomeComponent implements OnInit {
  @ViewChild('mapContainer', { static: false }) mapContainer?: ElementRef<HTMLDivElement>;
  places: Place[] = [];
  accessToken = (window as any)['__MAPBOX_TOKEN__'] || '';
  center: [number, number] = [-102.5528, 23.6345]; // Mexico center
  private map?: mapboxgl.Map;
  private markers: mapboxgl.Marker[] = [];

  constructor(private svc: PlaceService, private router: Router) {}

  ngOnInit(): void {
    this.svc.list().subscribe(r => {
      this.places = r || [];
      this.addMarkers();
    });
  }

  ngAfterViewInit(): void {
    if (!this.mapContainer) return;
    console.log('Mapbox token (window.__MAPBOX_TOKEN__):', this.accessToken);
    console.log('mapContainer element:', this.mapContainer.nativeElement);
    mapboxgl.accessToken = this.accessToken;
    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center as [number, number],
      zoom: 4.5
    });

    this.map.on('load', () => this.addMarkers());
  }

  private addMarkers(): void {
    if (!this.map) return;
    // clear existing markers
    for (const m of this.markers) {
      try { m.remove(); } catch (e) { /* ignore */ }
    }
    this.markers = [];

    if (!this.places?.length) return;

    for (const p of this.places) {
      const el = document.createElement('div');
      el.className = 'marker';
      el.textContent = '📍';
      el.style.cursor = 'pointer';

      // navigate to place detail when clicking the marker
      el.addEventListener('click', () => {
        this.router.navigate(['/places', p.id]);
      });

      const marker = new mapboxgl.Marker(el).setLngLat([p.longitude, p.latitude]).addTo(this.map);
      this.markers.push(marker);
    }
  }
}
