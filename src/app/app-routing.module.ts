import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimulationsComponent } from './componentes/simulations/simulations';
import { Step1Component } from './componentes/steps/step1/step1';
import {HomeComponent} from "./componentes/home/home";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'step1/:id', component: Step1Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
