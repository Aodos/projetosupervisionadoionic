import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPageModule } from '../pages/login/login.module';
import { PrincipalPageModule } from '../pages/principal/principal.module';
import { RestaranteService } from '../services/domain/categoria.service';
import { ItensService } from '../services/domain/itens.service';
import { ErrorInterceptorProvider } from '../interceptor/error-inteceptor';
import { AuthService } from '../services/auth.service';


@NgModule({
  declarations: [
    MyApp,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    LoginPageModule,
    PrincipalPageModule
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
    ErrorInterceptorProvider,
    AuthService
  ]
})
export class AppModule {}
