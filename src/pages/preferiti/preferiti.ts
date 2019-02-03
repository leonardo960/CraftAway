import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Events } from 'ionic-angular';
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
  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public utenteService : UtenteService, public translateService : TranslateService, public events : Events) {
    this.utenteService.getInserzioniPreferite().subscribe(
      (preferiti) => {
        for(let preferito of preferiti){
          preferito.dataPubblicazione = new Date(preferito.dataPubblicazione as number);
        }
        this.preferiti = preferiti;
      },
      (err) => {
        //error handling
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
          //error handling
        }
      );
    });
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
        //mostra alert
        for(let i = 0; i < this.preferiti.length; i++){
          if(this.preferiti[i].id == idPreferito.toString()){
            this.preferiti.splice(i, 1);
            break;
          }
        }
      },
      (err) => {
        //mostra alert
      }
    );
  }

}
