import { Component, OnInit } from '@angular/core';
import {ConsultasService} from "../../services/consultas.service";
import Simulation from "../../interfaces/simulation.interface";


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
