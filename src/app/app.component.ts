import { Component, ViewChild } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuController } from "ionic-angular";
import { Nav } from "ionic-angular";
import { TranslateService } from '@ngx-translate/core';
import { HomePage } from "../pages/home/home";
import { HOME_PAGE, MESSAGGI_PAGE, PROFILO_PAGE, SALVATI_PAGE, PUBBLICA_INSERZIONE_PAGE, LOGIN_PAGE, SIGNUP_PAGE, MIE_INSERZIONI_PAGE } from "../pages/pages";
import { UtenteService } from '../services/utente.service';
import { FiltriService } from '../services/filtri.service';
import { Storage } from '@ionic/storage';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController, private utenteService: UtenteService, private filtriService : FiltriService, public translateService : TranslateService, private storage : Storage, public alertController : AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      filtriService.init();
      utenteService.init();
      translateService.setDefaultLang("it");
      storage.get("lang").then(
        (lang) => {
          if(lang){
            translateService.use(lang);
          } else {
            translateService.use("it");
          }
        }
      );
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  goToSearch(){
    if(this.nav.getActive().name != HOME_PAGE){
      this.nav.push(HOME_PAGE);
    }
  }

  goToProfile(){
    if(this.nav.getActive().name != PROFILO_PAGE && this.utenteService.getUtenteLoggato != null){
      this.nav.push(PROFILO_PAGE);
    }
  }

  goToChat(){
    if(this.nav.getActive().name != MESSAGGI_PAGE){
      this.nav.push(MESSAGGI_PAGE);
    }
  }

  goToSaved(){
    if(this.nav.getActive().name != SALVATI_PAGE){
      this.nav.push(SALVATI_PAGE);
    }
  }

  goToLogin(){
    if(this.nav.getActive().name != LOGIN_PAGE){
      this.nav.push(LOGIN_PAGE);
    }
  }

  goToSignup(){
    if(this.nav.getActive().name != SIGNUP_PAGE){
      this.nav.push(SIGNUP_PAGE);
    }
  }

  isUserLogged() : boolean{
    return this.utenteService.getUtenteLoggato() != null;
  }

  goToNewInsertion(){
    if(this.nav.getActive().name != PUBBLICA_INSERZIONE_PAGE)
    {
      if(this.isUserLogged()){
        this.nav.push(PUBBLICA_INSERZIONE_PAGE);
      } else {
        this.nav.push(LOGIN_PAGE);
      }
    }
  }

  goToLanguage(){
    this.translateService.get("GUI_SELEZIONA_LINGUA").subscribe(
      (translation) => {
        this.translateService.get("SELECT_OKAY").subscribe(
          (translation2) => {
            this.alertController.create(
              {
                title: translation,
                inputs : [
                  {
                    name: "lang",
                    label: "Italiano",
                    value: "it",
                    type: "radio",
                    checked : this.translateService.currentLang == "it"
                  },
                  {
                    name: "lang",
                    label: "English",
                    value: "en",
                    type: "radio",
                    checked : this.translateService.currentLang == "en"
                  }
                ],
                buttons : [
                  {
                    text: translation2,
                    handler: (data) => {
                      this.translateService.use(data);
                      this.storage.set("lang", data);
                    }
                  }
                ]
              }
            ).present();
          }
        );
      }
    );
  }

  goToMieInserzioni(){
    if(this.nav.getActive().name != MIE_INSERZIONI_PAGE){
      this.nav.push(MIE_INSERZIONI_PAGE);
    }
  }


}

