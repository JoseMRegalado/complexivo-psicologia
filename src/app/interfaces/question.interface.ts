import {Opcion} from "./option.interface";

export default interface Pregunta {
  id: string;
  title: string;
  id_test: string;
  options: Opcion[];
  selectedOptions?: Opcion[];
}
