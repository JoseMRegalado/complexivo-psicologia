import { Component, OnInit } from '@angular/core';
import { ConsultasService } from "../../services/consultas.service";
import Simulation from "../../interfaces/simulation.interface";
import { Router } from "@angular/router";
import { LoginService } from "../../services/login.service";

@Component({
  selector: 'app-simulations',
  templateUrl: './simulations.html',
  styleUrls: ['./simulations.css']
})
export class SimulationsComponent implements OnInit {
  simulaciones: Simulation[] = [];
  mostrarModal: boolean = false;
  idSimulacionSeleccionada: string = '';

  constructor(
    private consultasService: ConsultasService,
    private router: Router,
    private authService: LoginService
  ) {}

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

  abrirModal(idSimulacion: string): void {
    this.idSimulacionSeleccionada = idSimulacion;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  iniciarNuevoIntento(): void {
    this.router.navigate(['/step1', this.idSimulacionSeleccionada]);
    this.cerrarModal();
  }

  verUltimoIntento(): void {
    this.authService.getCurrentUserId().subscribe(userId => {
      if (userId) {
        this.consultasService.obtenerRespuestasUsuario(userId, this.idSimulacionSeleccionada).subscribe(
          respuestas => {
            if (respuestas.length > 0) {
              this.router.navigate(['/ultimo-intento', this.idSimulacionSeleccionada]);
            } else {
              alert('No se encontraron respuestas anteriores.');
            }
            this.cerrarModal();
          },
          error => {
            console.error('Error al verificar los intentos: ', error);
          }
        );
      } else {
        console.error('User ID is null');
      }
    });
  }
}
