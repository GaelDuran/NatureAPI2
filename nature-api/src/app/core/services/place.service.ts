import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Place } from '../models/place.model';

@Injectable({
    providedIn: 'root'
})
export class PlaceService {
    
    private apiUrl = 'http://localhost:5268/api/places';
    
    constructor(private http: HttpClient) {}
    getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(this.apiUrl);
}

    getPlaceById(id: number): Observable<Place> {
    return this.http.get<Place>(`${this.apiUrl}/${id}`);
    }
}
