import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GetYourRateComponent } from './pages/get-your-rate/get-your-rate.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: "get-your-rate", component: GetYourRateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
