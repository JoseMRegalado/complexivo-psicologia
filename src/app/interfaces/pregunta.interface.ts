import {Opcion} from "./opcion.interface";

export default interface Pregunta {
  id: string;
  titulo: string;
  id_simulacion: string;
  opciones: Opcion[];
}
