import { Component, OnInit } from '@angular/core';
import {ConsultasService} from "../../../services/consultas.service";
import Simulation from "../../../interfaces/simulation.interface";
import {ActivatedRoute, Router} from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-step1',
  templateUrl: './step1.html',
  styleUrls: ['./step1.css']
})
export class Step1Component implements OnInit {
  simulations: Simulation | undefined;
  videoUrl: SafeResourceUrl | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private consultasService: ConsultasService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.consultasService.obtenerSimulacionPorId(id).subscribe(
          simulacion => {
            this.simulations = simulacion;
            this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.simulations?.video || '');
            console.log(this.simulations);
            console.log(this.simulations?.video);
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

  irAStep2(): void {
    if (this.simulations) {
      this.router.navigate(['/step2', this.simulations.id]);
    } else {
      console.error('Simulación no disponible.');
    }
  }


}
