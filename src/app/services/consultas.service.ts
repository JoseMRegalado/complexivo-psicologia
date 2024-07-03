import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import {forkJoin, Observable, switchMap} from 'rxjs';
import { map } from 'rxjs/operators';
import Simulation from '../interfaces/simulation.interface';
import Pregunta from '../interfaces/question.interface';
import firebase from 'firebase/compat/app';
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import Test from "../interfaces/test.interface";
import {Opcion} from "../interfaces/option.interface";
import {HttpClient} from "@angular/common/http";
import Pregunta1 from "../interfaces/question1.interface";
import User from "../interfaces/user.interface";
import UserResponse from "../interfaces/userResponse.interface";

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {
  constructor(private firestore: AngularFirestore, private http: HttpClient) {}

  obtenerSimulaciones(): Observable<Simulation[]> {
    const simulacionesRef = this.firestore.collection<Simulation>('simulation');
    return simulacionesRef.get().pipe(
      map((querySnapshot: QuerySnapshot<Simulation>) => {
        return querySnapshot.docs.map(doc => doc.data());
      })
    );
  }

  obtenerUsuarioPorId(id: string): Observable<User | undefined> {
    const docRef = this.firestore.collection<User>('user').doc(id);
    return docRef.get().pipe(
      map(doc => doc.exists ? doc.data() as User : undefined)
    );
  }

  obtenerSimulacionPorId(id: string): Observable<Simulation | undefined> {
    const docRef = this.firestore.collection<Simulation>('simulation').doc(id);
    return docRef.get().pipe(
      map(doc => doc.exists ? doc.data() as Simulation : undefined)
    );
  }

  obtenerTestPorSimulacionId(idSimulacion: string): Observable<Test[]> {
    const testsRef = this.firestore.collection<Test>('test', ref => ref.where('id_simulation', '==', idSimulacion));
    return testsRef.get().pipe(
      map((querySnapshot: QuerySnapshot<Test>) => {
        return querySnapshot.docs.map(doc => doc.data());
      })
    );
  }

  obtenerTestPorId(idTest: string): Observable<Test | undefined> {
    const docRef = this.firestore.collection<Test>('test').doc(idTest);
    return docRef.get().pipe(
      map(doc => doc.exists ? doc.data() as Test : undefined)
    );
  }

  actualizarEstadoTest(testId: string, state: string): Observable<void> {
    return new Observable<void>((observer) => {
      this.firestore.collection('test').doc(testId).update({ state })
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }




  obtenerPreguntasPorTestId(idTest: string): Observable<Pregunta[]> {
    const preguntasRef = this.firestore.collection<Pregunta>('question', ref => ref.where('id_test', '==', idTest));
    return preguntasRef.get().pipe(
      switchMap((querySnapshot: QuerySnapshot<Pregunta>) => {
        const preguntas = querySnapshot.docs.map(doc => {
          const pregunta = doc.data() as Pregunta;
          pregunta.id = doc.id;
          return pregunta;
        });
        const opcionesObservables = preguntas.map(pregunta =>
          this.firestore.collection<Opcion>(`question/${pregunta.id}/options`).get().pipe(
            map((optionsSnapshot: QuerySnapshot<Opcion>) => {
              pregunta.options = optionsSnapshot.docs.map(optionDoc => {
                const opcion = optionDoc.data() as Opcion;
                opcion.id = optionDoc.id;
                return opcion;
              });
              return pregunta;
            })
          )
        );
        return forkJoin(opcionesObservables);
      })
    );
  }

  obtenerPreguntasPorSimulacionId(idSimulacion: string): Observable<Pregunta1[]> {
    const preguntasRef = this.firestore.collection<Pregunta1>('question1', ref =>
      ref.where('id_simulation', '==', idSimulacion)
    );

    return preguntasRef.get().pipe(
      map((querySnapshot: QuerySnapshot<Pregunta1>) => {
        return querySnapshot.docs.map(doc => doc.data());
      })
    );
  }

  guardarRespuesta(idUsuario: string, idSimulacion: string, idPregunta: string, respuesta: string): Observable<void> {
    const respuestaRef = this.firestore.collection<UserResponse>('user_responses');
    const data: UserResponse = {
      id_usuario: idUsuario,
      id_simulacion: idSimulacion,
      id_pregunta: idPregunta,
      respuesta: respuesta
    };
    return new Observable<void>((observer) => {
      respuestaRef.add(data).then(() => {
        observer.next();
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  obtenerRespuestasUsuario(idUsuario: string, idSimulacion: string): Observable<UserResponse[]> {
    const respuestasRef = this.firestore.collection<UserResponse>('user_responses', ref =>
      ref.where('id_usuario', '==', idUsuario).where('id_simulacion', '==', idSimulacion)
    );
    return respuestasRef.get().pipe(
      map((querySnapshot: QuerySnapshot<UserResponse>) => {
        return querySnapshot.docs.map(doc => doc.data());
      })
    );
  }

}
