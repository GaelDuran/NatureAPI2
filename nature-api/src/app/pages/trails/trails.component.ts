import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceService } from '../../services/place.service';
import { Trail } from '../../models/place';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-trails',
  template: `
    <div class="page">
      <h2>Senderos</h2>
      <div *ngFor="let t of trails" class="trail-card">
        <h3>{{t.name || 'Sin nombre'}}</h3>
        <p>Distancia: {{(t.distanceMeters/1000) | number:'1.1-2'}} km • Dificultad: {{t.difficulty}} • Tiempo aprox: {{t.estimatedTimeMinutes || '—'}} min • Loop: {{t.loop ? 'Sí':'No'}}</p>
      </div>
    </div>
  `
})
export class TrailsComponent implements OnInit {
  trails: Trail[] = [];

  constructor(private svc: PlaceService) {}

  ngOnInit(): void {
    this.svc.list().subscribe(places => {
      this.trails = (places || []).flatMap(p => p.trails || []);
    });
  }
}
