import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trail } from '../models/trail.model';

@Injectable({
    providedIn: 'root'
})
    export class TrailService {

    private apiUrl = 'https://localhost:5268/api/trails';

    constructor(private http: HttpClient) {}

    getTrails(): Observable<Trail[]> {
        return this.http.get<Trail[]>(this.apiUrl);
    }
}
