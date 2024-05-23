import { Component, OnInit } from '@angular/core';
import {ConsultasService} from "../../servicios/consultas.service";
import Simulacion from "../../interfaces/simulacion.interface";


@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent implements OnInit {

  constructor(private consultasService: ConsultasService) { }

  ngOnInit(): void {

  }


}
