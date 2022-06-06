import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GetYourRateComponent } from './get-your-rate/get-your-rate.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: "", redirectTo: "landing-page", pathMatch: "full" },
  { path: "landing-page", component: HomeComponent },
  { path: "get-your-rate", component: GetYourRateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingRoutingModule { }
