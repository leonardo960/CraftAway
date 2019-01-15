import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuController } from "ionic-angular";
import { Nav } from "ionic-angular";

import { HomePage } from "../pages/home/home";
import { HOME_PAGE, MESSAGGI_PAGE, PROFILO_PAGE, SALVATI_PAGE, PUBBLICA_INSERZIONE_PAGE, LOGIN_PAGE, SIGNUP_PAGE, MIE_INSERZIONI_PAGE } from "../pages/pages";
import { UtenteService } from '../services/utente.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController, private utenteService: UtenteService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
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

  goToNewInsertion(){
    if(this.nav.getActive().name != PUBBLICA_INSERZIONE_PAGE){
      this.nav.push(PUBBLICA_INSERZIONE_PAGE);
    }
  }

  goToMieInserzioni(){
    if(this.nav.getActive().name != MIE_INSERZIONI_PAGE){
      this.nav.push(MIE_INSERZIONI_PAGE);
    }
  }


}

