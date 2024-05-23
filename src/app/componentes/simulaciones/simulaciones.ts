import { Component, OnInit } from '@angular/core';
import {ConsultasService} from "../../servicios/consultas.service";
import Simulacion from "../../interfaces/simulacion.interface";


@Component({
  selector: 'app-simulaciones',
  templateUrl: './simulaciones.html',
  styleUrls: ['./simulaciones.css']
})
export class SimulacionesComponent implements OnInit {
  simulaciones: Simulacion[] = [];

  constructor(private consultasService: ConsultasService) { }

  ngOnInit(): void {
    this.obtenerSimulaciones();
  }

  obtenerSimulaciones(): void {
    this.consultasService.obtenerSimulaciones().subscribe(
      simulaciones => {
        this.simulaciones = simulaciones;
        console.log(this.simulaciones);
      },
      error => {
        console.error('Error al obtener las simulaciones: ', error);
      }
    );
  }
}
