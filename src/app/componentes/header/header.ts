import { Component, OnInit } from '@angular/core';
import {ConsultasService} from "../../servicios/consultas.service";
import Simulacion from "../../interfaces/simulacion.interface";


@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {

  constructor(private consultasService: ConsultasService) { }

  ngOnInit(): void {

  }


}
