import { Component, OnInit } from '@angular/core';
import {ConsultasService} from "../../../servicios/consultas.service";
import Simulacion from "../../../interfaces/simulacion.interface";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-paso1',
  templateUrl: './paso1.html',
})
export class Paso1Component implements OnInit {
  simulaciones: Simulacion | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private consultasService: ConsultasService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => { // Cambia 'route' a 'activatedRoute'
      const id = params.get('id');
      if (id) {
        this.consultasService.obtenerSimulacionPorId(id).subscribe(
          simulaciones => {
            this.simulaciones = simulaciones;
            console.log(this.simulaciones);
          },
          error => {
            console.error('Error al obtener la simulación: ', error);
          }
        );
      }
    });
  }

  descargarArchivo(url: string | undefined): void {
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank'
      link.download = url.split('/').pop() || 'documento';
      link.click();
    } else {
      console.error('No hay archivo para descargar.');
    }
  }


}
