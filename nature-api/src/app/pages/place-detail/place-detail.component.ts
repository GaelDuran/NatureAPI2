import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PlaceService } from '../../services/place.service';
import { Place } from '../../models/place';
import mapboxgl from 'mapbox-gl';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-place-detail',
  template: `
    <div class="page" *ngIf="place">
      <h2>{{place.name}}</h2>
      <p *ngIf="place.description">{{place.description}}</p>
      <div class="meta">
        <div>Categoría: {{place.category}}</div>
        <div>Lat/Lon: {{place.latitude | number:'1.5-5'}}, {{place.longitude | number:'1.5-5'}}</div>
        <div>Altitud: {{place.altitude || '—'}}</div>
        <div>Accesible: {{place.accessible ? 'Sí' : 'No'}}</div>
        <div>Cuota: {{place.fee || '—'}}</div>
        <div>Horario: {{place.schedule || '—'}}</div>
      </div>

      <div class="gallery" *ngIf="place.photos?.length">
        <h3>Galería</h3>
        <div class="photos">
          <img *ngFor="let u of place.photos" [src]="u" />
        </div>
      </div>

      <div class="amenities" *ngIf="place.amenities?.length">
        <h3>Amenities</h3>
        <span class="chip" *ngFor="let a of place.amenities">{{a}}</span>
      </div>

      <div class="trails" *ngIf="place.trails?.length">
        <h3>Senderos</h3>
        <table>
          <thead><tr><th>Nombre</th><th>Distancia (m)</th><th>Dificultad</th><th>Tiempo (min)</th><th>Loop</th></tr></thead>
          <tbody>
            <tr *ngFor="let t of place.trails">
              <td>{{t.name}}</td>
              <td>{{t.distanceMeters}}</td>
              <td>{{t.difficulty}}</td>
              <td>{{t.estimatedTimeMinutes || '—'}}</td>
              <td>{{t.loop ? 'Sí':'No'}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mini-map">
        <div #mapMini class="map-small"></div>
      </div>
    </div>
  `,
  styles: [`.photos img{height:120px;margin:6px}.chip{display:inline-block;padding:6px;border-radius:12px;background:#eee;margin:4px}.map-small{height:300px;width:100%}`]
})
export class PlaceDetailComponent implements OnInit {
  place?: Place;
  accessToken = (window as any)['__MAPBOX_TOKEN__'] || '';
  @ViewChild('mapMini', { static: false }) mapMini?: ElementRef<HTMLDivElement>;
  private map?: mapboxgl.Map;

  constructor(private route: ActivatedRoute, private svc: PlaceService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.svc.get(id).subscribe(p => {
      this.place = p;
      // initialize mini map when place is available and view is ready
      this.initMiniMap();
    });
  }

  ngAfterViewInit(): void {
    // try initialize again in case place arrived before view
    this.initMiniMap();
  }

  private initMiniMap(): void {
    if (!this.place || !this.mapMini) return;
    if (this.map) return; // already initialized
    mapboxgl.accessToken = this.accessToken;
    this.map = new mapboxgl.Map({
      container: this.mapMini.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.place.longitude, this.place.latitude] as [number, number],
      zoom: 12
    });
    new mapboxgl.Marker().setLngLat([this.place.longitude, this.place.latitude]).addTo(this.map);
  }
}
