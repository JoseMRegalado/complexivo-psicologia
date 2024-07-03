import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultasService } from '../../services/consultas.service';
import UserResponse from '../../interfaces/userResponse.interface';
import Pregunta1 from '../../interfaces/question1.interface';
import { LoginService } from '../../services/login.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-ultimo-intento',
  templateUrl: './ultimo-intento.html',
  styleUrls: ['./ultimo-intento.css']
})
export class UltimoIntentoComponent implements OnInit {
  userId: string | null = null;
  simulationId: string = '';
  respuestas: UserResponse[] = [];
  preguntas: Pregunta1[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private consultasService: ConsultasService,
    private authService: LoginService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        this.simulationId = params.get('id') || '';
        return this.authService.getCurrentUserId();
      }),
      switchMap(userId => {
        this.userId = userId;
        if (this.simulationId && this.userId) {
          // @ts-ignore
          return this.consultasService.obtenerRespuestasUsuario(this.userId, this.simulationId);
        } else {
          throw new Error('Simulation ID or User ID is missing');
        }
      })
    ).subscribe(
      respuestas => {
        this.respuestas = respuestas;
        this.cargarPreguntas();
      },
      error => {
        console.error('Error al obtener las respuestas: ', error);
      }
    );
  }

  cargarPreguntas(): void {
    this.consultasService.obtenerPreguntasPorSimulacionId(this.simulationId).subscribe(
      preguntas => {
        this.preguntas = preguntas;
      },
      error => {
        console.error('Error al obtener las preguntas: ', error);
      }
    );
  }

  obtenerRespuesta(idPregunta: string): string {
    const respuesta = this.respuestas.find(r => r.id_pregunta === idPregunta);
    return respuesta ? respuesta.respuesta : '';
  }
}
