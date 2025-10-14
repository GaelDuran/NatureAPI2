import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Place } from '../models/place';

@Injectable({ providedIn: 'root' })
export class PlaceService {
  private base = '/api/places';

  constructor(private http: HttpClient) {}

  list(): Observable<Place[]> {
    return this.http.get<Place[]>(this.base);
  }

  get(id: string | number): Observable<Place> {
    return this.http.get<Place>(`${this.base}/${id}`);
  }
}
