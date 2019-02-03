import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Inserzione } from '../../model/inserzione';
import { FiltriService } from '../../services/filtri.service';
import { Categoria } from '../../model/categoria';
import { Materiale } from '../../model/materiale';
import { Paese } from '../../model/paese';
import { InserzioneService } from '../../services/inserzione.service';
import { UtenteService } from '../../services/utente.service';

/**
 * Generated class for the PubblicaInserzionePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pubblica-inserzione',
  templateUrl: 'pubblica-inserzione.html',
})
export class PubblicaInserzionePage {
  categorie: Categoria[];
  materiali: Materiale[];
  paesi: Paese[];
  immagini: string[];


  dataPubblicazione: Date; //la classe built-in per le date di Typescript è "Date"
  id: string; //(eventualmente codificato con qualcosa tipo base64)

  constructor(public navCtrl: NavController, public navParams: NavParams, public filtriService: FiltriService, public inserzioneService: InserzioneService, public utenteService: UtenteService) {
    // this.categorie = filtriService.categorie;
    // this.materiali = filtriService.materiali;
    // this.paesi = filtriService.paesi;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PubblicaInserzionePage');
  }

  pubblica() {
    //Ricavare i valori delle variabili
    let titolo = "";
    let prezzo = 0;
    let descrizione = "";
    let categoria = this.categorie[0];
    let materialiSelezionati;
    let paese = this.paesi[0];
    let utente = this.utenteService.getUtenteLoggato();
    let data = new Date();
    let id = "";

    let inserzione: Inserzione = new Inserzione(this.immagini, titolo, prezzo, data, paese, id, descrizione, categoria, materialiSelezionati, utente)
    this.inserzioneService.publishInserzione(inserzione);
  }

}
