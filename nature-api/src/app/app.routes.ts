import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlacesComponent } from './pages/places/places.component';
import { TrailsComponent } from './pages/trails/trails.component';
import { PlaceDetailComponent } from './pages/place-detail/place-detail.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'places', component: PlacesComponent },
	{ path: 'places/:id', component: PlaceDetailComponent },
	{ path: 'trails', component: TrailsComponent },
	{ path: '**', redirectTo: '' }
];
