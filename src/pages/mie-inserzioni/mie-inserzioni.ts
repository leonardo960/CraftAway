import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Inserzione } from "../../model/inserzione";
import { Utente } from "../../model/utente";
import { DETTAGLIO_INSERZIONE_PAGE } from "../pages";
import { InserzioneService } from "../../services/inserzione.service";
import { TranslateService } from '@ngx-translate/core';

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
  inserzioni: Inserzione[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public inserzioneService : InserzioneService, public translateService : TranslateService) {
    inserzioneService.getYourInserzioni().subscribe(
      (inserzioni) => {
        for(let inserzione of inserzioni){
          inserzione.dataPubblicazione = new Date(inserzione.dataPubblicazione as number);
        }
        this.inserzioni = inserzioni;
      },
      (err) => {
        //error handling
      }
    )
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MieInserzioniPage');
  }

  inserzioneTapped(idInserzione){
    this.navCtrl.push(DETTAGLIO_INSERZIONE_PAGE, {"idInserzione": idInserzione});
  }

  modificaInserzione(idInserzione){
    //this.navCtrl.push(MODIFICA_INSERZIONE_PAGE, {"idInserzione": idInserzione});
  }

  getCurrentLang(){
    return this.translateService.currentLang;
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
