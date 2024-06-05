import { Component, OnInit } from '@angular/core';
import {ConsultasService} from "../../services/consultas.service";
import Simulation from "../../interfaces/simulation.interface";


@Component({
  selector: 'app-simulations',
  templateUrl: './simulations.html',
  styleUrls: ['./simulations.css']
})
export class SimulationsComponent implements OnInit {
  simulaciones: Simulation[] = [];

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
        console.error('Error al obtener las simulations: ', error);
      }
    );
  }
}
