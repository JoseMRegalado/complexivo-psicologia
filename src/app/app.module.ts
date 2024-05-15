import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AngularFireModule} from "@angular/fire/compat";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {environment} from "../environments/environment";
import {SimulacionesComponent} from "./componentes/simulaciones/simulaciones";
import {LoginComponent} from "./componentes/login/login";

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirecciona al componente de inicio de sesión por defecto
  { path: 'login', component: LoginComponent },
  { path: 'simulaciones', component: SimulacionesComponent }
];
@NgModule({
  declarations: [
    AppComponent, LoginComponent, SimulacionesComponent
  ],

  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
