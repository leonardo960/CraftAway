import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Inserzione } from "../../model/inserzione";
import { Utente } from "../../model/utente";
import { DETTAGLIO_INSERZIONE_PAGE } from "../pages";
/**
 * Generated class for the MieInserzioniPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mie-inserzioni',
  templateUrl: 'mie-inserzioni.html',
})
export class MieInserzioniPage {
  inserzioni: Inserzione[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let utente = new Utente("Utente", "utente@email.com", "password", new Date(), 1, 1, {}, []);
    let inserzione1 = new Inserzione(["img1"], "Cuccioli di Dumbo", 50, new Date(), {id: "1", nome: "Italia"}, "1", "Cuccioli di Dumbo freschi da sgranocchiare!", {id: "1", nome: "Snack"}, [], utente);
    let inserzione2 = new Inserzione(["img2"], "Spade da guerra medievali assortite", 125, new Date(), {id: "2", nome: "Polonia"}, "2", "La descrizione neanche si legge da qua...", {id: "2", nome: "Armi"}, [], utente);
    this.inserzioni = [inserzione1, inserzione2];

    /*inserzioneService.getInserzioni().subscribe(
      (inserzioni : Inserzione[]) => {
        this.inserzioni = inserzioni;
      },
      (err) => {
        //error handling
      }
    )
    */
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MieInserzioniPage');
  }

  inserzioneTapped(idInserzione){
    this.navCtrl.push(DETTAGLIO_INSERZIONE_PAGE, {"idInserzione": idInserzione});
  }

  modificaInserzione(inserzione){
    //this.navCtrl.push(MODIFICA_INSERZIONE_PAGE, {"idInserzione": idInserzione});
  }

  showDeleteConfirmPopup(){

  }
  showDeleteSuccessPopup(){

  }

  deleteInserzione(idInserzione){
    //this.inserzioneService.deleteInserzione(idInserzione);
    //this.showDeleteSuccessPopup();
  }

}
