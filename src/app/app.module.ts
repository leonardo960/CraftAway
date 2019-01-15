import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MessaggiPage } from "../pages/messaggi/messaggi";
import { MieInserzioniPage } from "../pages/mie-inserzioni/mie-inserzioni";
import { PopMenu } from "../pages/home/home";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChatService } from '../services/chat.service'
import { UtenteService } from '../services/utente.service'
import { IonicStorageModule } from '@ionic/storage';
import { httpInterceptorProviders } from '../interceptors';
import { MessaggiPageModule } from "../pages/messaggi/messaggi.module"
import { RicercaService } from '../services/ricerca.service';
import { MieInserzioniPageModule } from '../pages/mie-inserzioni/mie-inserzioni.module';
import { LangMenu } from '../pages/profilo/profilo';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PopMenu,
    LangMenu
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    MessaggiPageModule,
    MieInserzioniPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MessaggiPage,
    MieInserzioniPage,
    PopMenu,
    LangMenu
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ChatService,
    UtenteService,
    RicercaService,
    httpInterceptorProviders,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
