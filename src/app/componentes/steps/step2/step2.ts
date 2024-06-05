import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ConsultasService } from '../../../services/consultas.service';
import Test from "../../../interfaces/test.interface";

@Component({
  selector: 'app-step2',
  templateUrl: './step2.html',
  styleUrls: ['./step2.css']
})
export class Step2Component implements OnInit {
  tests: Test[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private consultasService: ConsultasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.consultasService.obtenerTestPorSimulacionId(id).subscribe(
          tests => {
            this.tests = tests;
            console.log(this.tests);
          },
          error => {
            console.error('Error al obtener las preguntas: ', error);
          }
        );
      }
    });
  }

  realizarTest(idTest: string): void {
    this.router.navigate(['/test', idTest]);
  }
}
