import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Inserzione } from '../../model/inserzione';
import { Utente } from '../../model/utente';

/**
 * Generated class for the PreferitiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preferiti',
  templateUrl: 'preferiti.html',
})
export class PreferitiPage {
  preferiti : Inserzione[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let utente = new Utente("Utente", "utente@email.com", "password", new Date(), 1, 1, {}, []);
    let inserzione1 = new Inserzione(["img1"], "Cuccioli di Dumbo", 50, new Date(), {id: "1", nome: "Italia"}, "1", "Cuccioli di Dumbo freschi da sgranocchiare!", {id: "1", nome: "Snack"}, [], utente);
    let inserzione2 = new Inserzione(["img2"], "Spade da guerra medievali assortite", 125, new Date(), {id: "2", nome: "Polonia"}, "2", "La descrizione neanche si legge da qua...", {id: "2", nome: "Armi"}, [], utente);
    this.preferiti = [inserzione1, inserzione2];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreferitiPage');
  }

  preferitoTapped(idPreferito : number){
    //this.navCtrl.push(DETTAGLIO_INSERZIONE, {"idInserzione" : idPreferito});
  }

  eliminaPreferito(idPreferito : number){
    //manda la richiesta al server e poi eliminalo anche client-side da preferiti;
  }

}
