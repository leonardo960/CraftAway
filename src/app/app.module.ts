import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MessaggiPage } from "../pages/messaggi/messaggi";
import { MieInserzioniPage } from "../pages/mie-inserzioni/mie-inserzioni";
import { PopMenu } from "../pages/home/home";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChatService } from '../services/chat.service'
import { UtenteService } from '../services/utente.service'
import { FiltriService } from '../services/filtri.service';
import { IonicStorageModule } from '@ionic/storage';
import { httpInterceptorProviders } from '../interceptors';
import { MessaggiPageModule } from "../pages/messaggi/messaggi.module"
import { RicercaService } from '../services/ricerca.service';
import { InserzioneService } from '../services/inserzione.service';
import { MieInserzioniPageModule } from '../pages/mie-inserzioni/mie-inserzioni.module';
import { NewMessageModal } from '../pages/dettaglio-inserzione/dettaglio-inserzione';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PopMenu,
    NewMessageModal
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    MessaggiPageModule,
    MieInserzioniPageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MessaggiPage,
    MieInserzioniPage,
    PopMenu,
    NewMessageModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ChatService,
    UtenteService,
    RicercaService,
    FiltriService,
    InserzioneService,
    httpInterceptorProviders,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
