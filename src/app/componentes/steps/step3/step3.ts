import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Pregunta1 from "../../../interfaces/question1.interface";
import {ConsultasService} from "../../../services/consultas.service";
import {Observable} from "rxjs";
import { LoginService } from '../../../services/login.service';
import User from "../../../interfaces/user.interface";

@Component({
  selector: 'app-step3',
  templateUrl: './step3.html',
  styleUrls: ['./step3.css']
})
export class Step3Component implements OnInit {
  simulationId: string = '';
  preguntas: Pregunta1[] = [];
  preguntaActualIndex: number = 0;
  miRespuesta: string = '';
  analisisChatGpt: string = '';
  mostrarChatGptRespuesta: boolean = false;
  loggedIn: boolean = false;
  currentUser: User | null = null;
  currentUserId: string | null = null;

  constructor(private activatedRoute: ActivatedRoute,
              private consultasService: ConsultasService,
              private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.simulationId = params.get('id') || '';
      if (this.simulationId) {
        this.consultasService.obtenerPreguntasPorSimulacionId(this.simulationId).subscribe(
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

    this.loginService.isLoggedIn().subscribe(isLoggedIn => {
      this.loggedIn = isLoggedIn;
    });

    this.loginService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });

    this.loginService.getCurrentUserId().subscribe(userId => {
      this.currentUserId = userId;
    });
  }

  siguientePregunta(): void {
    this.guardarRespuesta().subscribe(() => {
      if (this.preguntaActualIndex < this.preguntas.length - 1) {
        this.preguntaActualIndex++;
      }
      this.miRespuesta = ''; // Limpiar la respuesta al avanzar a la siguiente pregunta
      this.mostrarChatGptRespuesta = false; // Ocultar la sección de Chat GPT
      this.analisisChatGpt = ''; // Limpiar el análisis
    }, error => {
      console.error('Error al guardar la respuesta: ', error);
    });
  }

  guardarRespuesta(): Observable<void> {
    const preguntaActual = this.preguntaActual();
    if (!preguntaActual || !this.currentUserId) return new Observable<void>((observer) => observer.complete());

    return this.consultasService.guardarRespuesta(this.currentUserId, this.simulationId, preguntaActual.id, this.miRespuesta);
  }

  preguntaActual(): Pregunta1 | undefined {
    return this.preguntas[this.preguntaActualIndex];
  }

  preguntaAnterior(): void {
    if (this.preguntaActualIndex > 0) {
      this.preguntaActualIndex--;
    }
    this.miRespuesta = ''; // Limpiar la respuesta al avanzar a la siguiente pregunta
    this.mostrarChatGptRespuesta = false; // Ocultar la sección de Chat GPT
    this.analisisChatGpt = ''; // Limpiar el análisis
  }

  finalizarSimulacion(): void {
    // Aquí puedes añadir la lógica para finalizar la simulación
    confirm('¿Desea finalizar la simulación?');
    console.log('Simulación finalizada');
    this.miRespuesta = ''; // Limpiar la respuesta al avanzar a la siguiente pregunta
    this.mostrarChatGptRespuesta = false; // Ocultar la sección de Chat GPT
    this.analisisChatGpt = ''; // Limpiar el análisis
  }

  enviarRespuesta(): void {
    // Simulación de la llamada a ChatGPT y almacenamiento del análisis
    this.analisisChatGpt = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.';
  }

  limpiar(): void {
    this.miRespuesta = '';
    this.analisisChatGpt = '';
    this.mostrarChatGptRespuesta = false;
  }

  mostrarRespuestaEnChatGpt(): void {
    this.mostrarChatGptRespuesta = true;
  }
}
