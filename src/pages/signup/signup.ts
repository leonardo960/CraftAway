import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtenteService } from "../../services/utente.service";
import { Utente } from "../../model/utente";
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public utenteService: UtenteService) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup() : void {
    let newUtente : Utente = new Utente(this.nome, this.email, this.password, new Date(), 0, 0, "{}", []);

    this.utenteService.signup(newUtente).subscribe(
      (response) => {
        //TODO: magari prima mostrare un alert di avvenuta registrazione e quando si preme ok
        //eseguire le righe di codice sottostanti
        this.utenteService.setUtenteLoggato(newUtente);
        this.utenteService.setActiveToken(response.headers.get("token"));
        this.navCtrl.pop();
      }
    );
  }

}
