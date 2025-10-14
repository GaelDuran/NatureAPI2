import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceService } from '../../services/place.service';
import { Place } from '../../models/place';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-places',
  template: `
    <div class="page">
      <h2>Lugares</h2>
      <table class="places">
        <thead><tr><th>Nombre</th><th>Categoría</th><th>Lat</th><th>Lon</th><th>Acciones</th></tr></thead>
        <tbody>
          <tr *ngFor="let p of places">
            <td>{{p.name}}</td>
            <td>{{p.category}}</td>
            <td>{{p.latitude}}</td>
            <td>{{p.longitude}}</td>
            <td><button (click)="view(p.id)">Ver</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class PlacesComponent implements OnInit {
  places: Place[] = [];

  constructor(private svc: PlaceService, private router: Router) {}

  ngOnInit(): void {
    this.svc.list().subscribe(r => (this.places = r || []));
  }

  view(id: string | number) {
    this.router.navigate(['/places', id]);
  }
}
