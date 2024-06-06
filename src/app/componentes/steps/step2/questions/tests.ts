import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ConsultasService } from '../../../../services/consultas.service';
import Pregunta from "../../../../interfaces/question.interface";


@Component({
  selector: 'app-tests',
  templateUrl: './tests.html',
  styleUrls: ['./tests.css']
})
export class TestsComponent implements OnInit {
  preguntas: Pregunta[] = [];
  preguntaActualIndex: number = 0;
  testId: string = '';
  testTitle: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private consultasService: ConsultasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.testId = params.get('testId')!;
      if (this.testId) {
        // Obtener el test por ID
        this.consultasService.obtenerTestPorId(this.testId).subscribe(
          test => {
            if (test) {
              this.testTitle = test.title;
            }
          },
          error => {
            console.error('Error al obtener el test: ', error);
          }
        );

        // Obtener las preguntas del test
        this.consultasService.obtenerPreguntasPorTestId(this.testId).subscribe(
          preguntas => {
            this.preguntas = preguntas;
          },
          error => {
            console.error('Error al obtener las preguntas: ', error);
          }
        );
      }
    });
  }

  siguientePregunta(): void {
    if (this.preguntaActualIndex < this.preguntas.length - 1) {
      this.preguntaActualIndex++;
    }
  }

  anteriorPregunta(): void {
    if (this.preguntaActualIndex > 0) {
      this.preguntaActualIndex--;
    }
  }

  finalizarTest(): void {
    this.router.navigate(['/step2']);
  }


}
