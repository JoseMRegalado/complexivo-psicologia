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
import {Paso1Component} from "./componentes/pasos/paso1/paso1";
import {AppRoutingModule} from "./app-routing.module";
import {ConsultasService} from "./servicios/consultas.service";
import {HeaderComponent} from "./componentes/header/header";
import {HomeComponent} from "./componentes/home/home";
import {FooterComponent} from "./componentes/footer/footer";

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'simulaciones', component: SimulacionesComponent },
  { path: 'paso1', component: Paso1Component},
  {path: 'home', component: HomeComponent},
];
@NgModule({
  declarations: [
    AppComponent, LoginComponent, SimulacionesComponent, Paso1Component, HeaderComponent, HomeComponent,
    FooterComponent
  ],

  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    provideStorage(() => getStorage()),
    AppRoutingModule
  ],
  providers: [ConsultasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
