import {Injectable} from "@angular/core"
import { AngularFirestore, DocumentReference } from "@angular/fire/compat/firestore";
import firebase from "firebase/compat";
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import {map, Observable} from "rxjs";
import Simulacion from "../interfaces/simulacion.interface";
@Injectable({
  providedIn:"root"
})
export class ConsultasService {
  constructor(private firestore: AngularFirestore) {
  }

  obtenerSimulaciones(): Observable<Simulacion[]> {
    try {
      const simulacionesRef = this.firestore.collection<Simulacion>
      ("simulacion", ref => ref);
      return simulacionesRef.get().pipe(
        map((querySnapshot: QuerySnapshot<Simulacion>) => {
          return querySnapshot.docs.map(doc => doc.data());
        })
      );
    } catch (error) {
      console.error("Error al obtener las simulaciones: ", error);
      return new Observable<Simulacion[]>(observer => {
        observer.next([]);
        observer.complete();
      });
    }
  }
}
