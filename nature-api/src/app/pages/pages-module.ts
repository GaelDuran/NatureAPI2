import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { pagesRoutes } from './pages.routes';
import { HomeComponent } from './home.component/home.component';
import { PlacesComponent } from './places.component/places.component';
import { TrailsComponent } from './trails.component/trails.component';
import { PlaceDetailComponent } from './place-detail.component/place-detail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(pagesRoutes),
    HomeComponent,
    PlacesComponent,
    TrailsComponent,
    PlaceDetailComponent
  ]
})
export class PagesModule {}
