import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Simulacion from '../interfaces/simulation.interface';
import Pregunta from '../interfaces/question.interface';
import firebase from 'firebase/compat/app';
import QuerySnapshot = firebase.firestore.QuerySnapshot;

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {
  constructor(private firestore: AngularFirestore) {}

  obtenerSimulaciones(): Observable<Simulacion[]> {
    const simulacionesRef = this.firestore.collection<Simulacion>('simulacion');
    return simulacionesRef.get().pipe(
      map((querySnapshot: QuerySnapshot<Simulacion>) => {
        return querySnapshot.docs.map(doc => doc.data());
      })
    );
  }

  obtenerSimulacionPorId(id: string): Observable<Simulacion | undefined> {
    const docRef = this.firestore.collection<Simulacion>('simulacion').doc(id);
    return docRef.get().pipe(
      map(doc => doc.exists ? doc.data() as Simulacion : undefined)
    );
  }

  obtenerPreguntasPorSimulacionId(idSimulacion: string): Observable<Pregunta[]> {
    const preguntasRef = this.firestore.collection<Pregunta>('preguntas', ref => ref.where('id_simulacion', '==', idSimulacion));
    return preguntasRef.get().pipe(
      map((querySnapshot: QuerySnapshot<Pregunta>) => {
        return querySnapshot.docs.map(doc => doc.data());
      })
    );
  }
}
