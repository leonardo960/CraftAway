import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Inserzione } from "../../model/inserzione";
import { Utente } from "../../model/utente";
import { DETTAGLIO_INSERZIONE_PAGE, MODIFICA_INSERZIONE_PAGE } from "../pages";
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public inserzioneService : InserzioneService, public translateService : TranslateService, public alertController : AlertController) {
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

  showInserzioniError(){
    this.alertController.create({
      title: "Oh no!",
      message: "Si è verificato un errore nel recupero delle tue inserzioni. Riprova più tardi!",
      buttons : [{
        text: "Capito",
        handler : () => {
          this.navCtrl.pop();
        }
      }]
    }).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MieInserzioniPage');
  }

  inserzioneTapped(idInserzione){
    this.navCtrl.push(DETTAGLIO_INSERZIONE_PAGE, {"idInserzione": idInserzione});
  }

  modificaInserzione(idInserzione){
    this.navCtrl.push(MODIFICA_INSERZIONE_PAGE, {"idInserzione": idInserzione});
  }

  getCurrentLang(){
    return this.translateService.currentLang;
  }

  showDeleteConfirmPopup(idInserzione){
    this.alertController.create({
      title: "Conferma",
      message: "Vuoi davvero eliminare questa inserzione?",
      buttons : [{
        text: "Elimina",
        handler : () => {
          this.deleteInserzione(idInserzione);
        }, 
      }, 
    {
      text: "Annulla",
      role: "cancel"
    }]
    }).present();
  }
  showDeleteSuccessPopup(){
    this.alertController.create({
      title: "Eliminata",
      message: "L'inserzione è stata rimossa con successo.",
      buttons : [{
        text: "Capito"
      }]
    }).present();
  }

  deleteInserzione(idInserzione){
    this.inserzioneService.deleteInserzione(idInserzione).subscribe(
      (ok) => {
        this.showDeleteSuccessPopup();
        for(let i = 0; i < this.inserzioni.length; i++){
          if(this.inserzioni[i].id == idInserzione){
            this.inserzioni = this.inserzioni.splice(i, 1);
            break;
          }
        }
      },
      (err) => {
        this.showDeleteError();
      }
    );
  }

  showDeleteError(){
    this.alertController.create({
      title: "Oh no!",
      message: "Si è verificato un errore nell'eliminazione dell'inserzione. Riprova più tardi!",
      buttons : [{
        text: "Capito"
      }]
    }).present();
  }

}
