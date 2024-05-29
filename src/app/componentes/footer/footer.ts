import { Component, OnInit } from '@angular/core';
import {ConsultasService} from "../../services/consultas.service";
import Simulacion from "../../interfaces/simulation.interface";


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
