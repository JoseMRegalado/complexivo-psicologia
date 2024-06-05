import { Component, OnInit } from '@angular/core';
import {ConsultasService} from "../../services/consultas.service";
import Simulation from "../../interfaces/simulation.interface";


@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

  constructor(private consultasService: ConsultasService) { }

  ngOnInit(): void {

  }


}
