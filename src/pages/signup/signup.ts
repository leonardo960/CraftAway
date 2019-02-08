import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UtenteService } from "../../services/utente.service";
import { Utente } from "../../model/utente";
import { Paese } from "../../model/paese";
import { FiltriService } from "../../services/filtri.service";
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  email : string;
  password : string;
  paeseId : string;
  nome : string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public utenteService: UtenteService, public filtriService : FiltriService, public alertController : AlertController) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  showSignupSuccess(){
    this.alertController.create({
      title: "Benvenuto!",
      message: "La registrazione del tuo account è andata a buon fine. Buon divertimento su CraftAway!",
      buttons : [{
        text: "Ottimo!",
        handler: () => {
          this.navCtrl.pop();
        }
      }]
    }).present();
  }

  showSignupError(){
    this.alertController.create({
      title: "Oh no!",
      message: "Si è verificato un errore nella registrazione del nuovo account. Riprova più tardi!",
      buttons : [{
        text: "Capito"
      }]
    }).present();
  }

  signup() : void {
    let newUtente : Utente = new Utente(this.nome, this.email, this.password, new Date(), 0, 0, []);

    this.utenteService.signup(newUtente).subscribe(
      (response) => {
        if(response.status == 200){
          this.utenteService.setUtenteLoggato(newUtente);
          this.utenteService.setActiveToken(response.headers.get("token"));
          this.showSignupSuccess();
        } else {
          this.showSignupError();
        }
      }
    );
  }

}
