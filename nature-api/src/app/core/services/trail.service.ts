import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trail } from '../models/trail.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
    export class TrailService {

    private apiUrl = `${environment.API_URL}/trails`;

    constructor(private http: HttpClient) {}

    getTrails(): Observable<Trail[]> {
        return this.http.get<Trail[]>(this.apiUrl);
    }
}
