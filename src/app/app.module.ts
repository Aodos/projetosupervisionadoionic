import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, AlertController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPageModule } from '../pages/login/login.module';
import { PrincipalPageModule } from '../pages/principal/principal.module';
import { RestaranteService } from '../services/domain/categoria.service';
import { ItensService } from '../services/domain/itens.service';
import { ErrorInterceptorProvider } from '../interceptor/error-inteceptor';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { ClienteService } from '../services/domain/cliente.service';
import {Geolocation} from '@ionic-native/geolocation'
import { InputMaskModule } from 'ionic-input-mask';


@NgModule({
  declarations: [
    MyApp,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    LoginPageModule,
    PrincipalPageModule,
    InputMaskModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestaranteService,
    ItensService,
    ClienteService,
    ErrorInterceptorProvider,
    AuthService,
    AlertController,
    StorageService,
    Geolocation
  ]
})
export class AppModule {}
