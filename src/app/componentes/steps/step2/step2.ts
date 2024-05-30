import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultasService } from '../../../services/consultas.service';
import Pregunta from '../../../interfaces/question.interface';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.html',
  styleUrls: ['./step2.css']
})
export class Step2Component implements OnInit {
  preguntas: Pregunta[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private consultasService: ConsultasService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.consultasService.obtenerPreguntasPorSimulacionId(id).subscribe(
          preguntas => {
            this.preguntas = preguntas;
            console.log(this.preguntas);
          },
          error => {
            console.error('Error al obtener las preguntas: ', error);
          }
        );
      }
    });
  }

  realizarTest(idPregunta: string): void {
    console.log(`Iniciar test para la pregunta con ID: ${idPregunta}`);
  }
}
