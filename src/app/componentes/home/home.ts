import { Component, OnInit } from '@angular/core';
import {ConsultasService} from "../../services/consultas.service";
import Simulation from "../../interfaces/simulation.interface";


@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
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
