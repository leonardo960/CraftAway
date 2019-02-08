import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Events, AlertController } from 'ionic-angular';
import { Inserzione } from '../../model/inserzione';
import { UtenteService } from '../../services/utente.service';
import { DETTAGLIO_INSERZIONE_PAGE } from '../pages';
import { TranslateService } from '@ngx-translate/core';

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
  preferiti : Inserzione[] = [];
  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public utenteService : UtenteService, public translateService : TranslateService, public events : Events, public alertController : AlertController) {
    this.utenteService.getInserzioniPreferite().subscribe(
      (preferiti) => {
        for(let preferito of preferiti){
          preferito.dataPubblicazione = new Date(preferito.dataPubblicazione as number);
        }
        this.preferiti = preferiti;
      },
      (err) => {
        this.showPreferitiError();
      }
    );
    events.subscribe("refreshPreferiti", () => {
      this.utenteService.getInserzioniPreferite().subscribe(
        (preferiti) => {
          for(let preferito of preferiti){
            preferito.dataPubblicazione = new Date(preferito.dataPubblicazione as number);
          }
          this.preferiti = preferiti;
        },
        (err) => {
          this.showPreferitiError();
        }
      );
    });
  }

  showPreferitiError(){
    this.alertController.create({
      title: "Oh no!",
      message: "Si è verificato un errore nel recupero delle tue inserzioni preferite. Riprova più tardi!",
      buttons : [{
        text: "Capito",
        handler: () => {
          this.navCtrl.popToRoot();
        }
      }]
    }).present();
  }

  getCurrentLang() : string{
    return this.translateService.currentLang;
  }

  preferitoTapped(idPreferito : number){
    this.app.getRootNav().push(DETTAGLIO_INSERZIONE_PAGE, {"idInserzione" : idPreferito});
  }

  eliminaPreferito(idPreferito : number){
    this.utenteService.deleteInserzionePreferita(idPreferito).subscribe(
      (ok) => {
        for(let i = 0; i < this.preferiti.length; i++){
          if(this.preferiti[i].id == idPreferito.toString()){
            this.preferiti.splice(i, 1);
            break;
          }
        }
      },
      (err) => {
        this.showDeletePreferitoError();
      }
    );
  }

  showDeletePreferitoError(){
    this.alertController.create({
      title: "Oh no!",
      message: "Si è verificato un errore nell'eliminazione dell'inserzione dai preferiti. Riprova più tardi!",
      buttons : [{
        text: "Capito"
      }]
    }).present();
  }

}
