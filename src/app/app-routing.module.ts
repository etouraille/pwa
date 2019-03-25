import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
     path: 'config',
     loadChildren: './config/config.module#ConfigModule'
  },
  {
     path: 'slider',
     loadChildren: './slider/slider.module#SliderModule'
  },
  {
    path: 'viz',
    loadChildren: './viz/viz.module#VizModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
