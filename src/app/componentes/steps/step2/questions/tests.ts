import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultasService } from '../../../../services/consultas.service';
import Pregunta from "../../../../interfaces/question.interface";
import Simulation from "../../../../interfaces/simulation.interface";
import { Opcion } from "../../../../interfaces/option.interface";

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
  simulationId: string = '';
  testDescription: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private consultasService: ConsultasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.testId = params.get('testId')!;
      this.testDescription = params.get('testDescription')!;
      this.activatedRoute.queryParams.subscribe(queryParams => {
        this.simulationId = queryParams['simulationId']; // Obtener simulationId de los parámetros de consulta
      });
      if (this.testId) {
        // Obtener el test por ID
        this.consultasService.obtenerTestPorId(this.testId).subscribe(
          test => {
            if (test) {
              this.testTitle = test.title;
              this.testDescription = test.description;
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
            // Inicializar el campo selectedOptions si no existe
            this.preguntas.forEach(pregunta => pregunta.selectedOptions = []);
          },
          error => {
            console.error('Error al obtener las preguntas: ', error);
          }
        );
      }
    });
  }

  seleccionarOpcion(pregunta: Pregunta, opcion: Opcion): void {
    const index = pregunta.selectedOptions!.indexOf(opcion);
    if (index === -1) {
      pregunta.selectedOptions!.push(opcion);
    } else {
      pregunta.selectedOptions!.splice(index, 1);
    }
  }

  siguientePregunta(): void {
    if (this.preguntas[this.preguntaActualIndex].selectedOptions!.length > 0) {
      this.preguntaActualIndex++;
    } else {
      alert('Debes seleccionar al menos una opción antes de avanzar.');
    }
  }

  anteriorPregunta(): void {
    if (this.preguntaActualIndex > 0) {
      this.preguntaActualIndex--;
    }
  }

  finalizarTest(): void {
    this.consultasService.actualizarEstadoTest(this.testId, 'completado').subscribe(
      () => {
        this.router.navigate(['/step2', this.simulationId]);
      },
      error => {
        console.error('Error al actualizar el estado del test: ', error);
      }
    );
  }
}
