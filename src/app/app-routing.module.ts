import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimulationsComponent } from './componentes/simulations/simulations';
import { Step1Component } from './componentes/steps/step1/step1';
import {HomeComponent} from "./componentes/home/home";
import {Step2Component} from "./componentes/steps/step2/step2";
import {AuthGuard} from "./auth.guard";
import {TestsComponent} from "./componentes/steps/step2/questions/tests";
import {Step3Component} from "./componentes/steps/step3/step3";
import {UltimoIntentoComponent} from "./componentes/lastAttempt/ultimo-intento";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'step1/:id', component: Step1Component },
  { path: 'step2/:id', component: Step2Component },
  { path: 'step3/:id', component: Step3Component },
  { path: 'simulations', component: SimulationsComponent, canActivate: [AuthGuard] },
  { path: 'test/:testId', component: TestsComponent },
  { path: 'ultimo-intento/:id', component: UltimoIntentoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
