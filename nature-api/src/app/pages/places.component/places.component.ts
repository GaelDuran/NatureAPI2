import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../../core/services/place.service';
import { Place } from '../../core/models/place.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styles: ['']
})
export class PlacesComponent implements OnInit {

  places: Place[] = [];

  constructor(private placeService: PlaceService) {}

  ngOnInit(): void {
    this.placeService.getPlaces().subscribe(data => {
      this.places = data;
    });
  }
}
