import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimulacionesComponent } from './componentes/simulaciones/simulaciones';
import { Paso1Component } from './componentes/pasos/paso1/paso1';

const routes: Routes = [
  { path: '', component: SimulacionesComponent },
  { path: 'paso1/:id', component: Paso1Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
