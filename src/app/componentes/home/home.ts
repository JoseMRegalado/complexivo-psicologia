import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ConsultasService } from "../../services/consultas.service";
import Simulation from "../../interfaces/simulation.interface";
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y, SwiperOptions, Swiper} from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  simulaciones: Simulation[] = [];
  swiperConfig: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 10,
    navigation: true,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    breakpoints: {
      640: { slidesPerView: 1, spaceBetween: 10 },
      768: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 30 }
    }
    }

  constructor(private consultasService: ConsultasService) { }

  ngOnInit(): void {
    this.obtenerSimulaciones();

  }

  obtenerSimulaciones(): void {
    this.consultasService.obtenerSimulaciones().subscribe(
      simulaciones => {
        this.simulaciones = simulaciones;
        console.log(this.simulaciones);
      },
      error => {
        console.error('Error al obtener las simulations: ', error);
      }
    );
  }
}
