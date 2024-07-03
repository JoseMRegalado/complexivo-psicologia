import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule

import { AppComponent } from './app.component';
import {AngularFireModule} from "@angular/fire/compat";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {environment} from "../environments/environment";
import {SimulationsComponent} from "./componentes/simulations/simulations";
import {LoginComponent} from "./componentes/login/login";
import {Step1Component} from "./componentes/steps/step1/step1";
import {AppRoutingModule} from "./app-routing.module";
import {ConsultasService} from "./services/consultas.service";
import {HeaderComponent} from "./componentes/header/header";
import {HomeComponent} from "./componentes/home/home";
import {FooterComponent} from "./componentes/footer/footer";
import {Step2Component} from "./componentes/steps/step2/step2";
import {TestsComponent} from "./componentes/steps/step2/questions/tests";
import {ProgressBarComponent} from "./componentes/progressBar/progressBar";
import {Step3Component} from "./componentes/steps/step3/step3";
import { SwiperModule } from 'swiper/angular';
import {UltimoIntentoComponent} from "./componentes/lastAttempt/ultimo-intento";

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'simulations', component: SimulationsComponent },
  { path: 'step1', component: Step1Component},
  {path: 'home', component: HomeComponent},
  {path: '', component: HomeComponent},
  {path: 'test', component: TestsComponent},
];
@NgModule({
  declarations: [
    AppComponent, LoginComponent, SimulationsComponent, Step1Component, HeaderComponent, HomeComponent,
    FooterComponent, Step2Component,  TestsComponent, ProgressBarComponent, Step3Component, UltimoIntentoComponent
  ],


  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    provideStorage(() => getStorage()),
    AppRoutingModule,
    SwiperModule
  ],
  providers: [ConsultasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
