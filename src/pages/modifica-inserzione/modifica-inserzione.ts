import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Categoria } from '../../model/categoria';
import { Materiale } from '../../model/materiale';
import { Paese } from '../../model/paese';
import { FiltriService } from '../../services/filtri.service';
import { InserzioneService } from '../../services/inserzione.service';
import { UtenteService } from '../../services/utente.service';
import { Inserzione } from '../../model/inserzione';

/**
 * Generated class for the ModificaInserzionePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modifica-inserzione',
  templateUrl: 'modifica-inserzione.html',
  providers: [InserzioneService, FiltriService, UtenteService]
})
export class ModificaInserzionePage {
  categorie: Categoria[];
  materiali: Materiale[];
  paesi: Paese[];
  immagini: string[];
  dataPubblicazione: Date; //la classe built-in per le date di Typescript è "Date"
  titolo: string;
  prezzo: number;
  descrizione: string;
  categoria: Categoria;
  materialiSelezionati: Materiale[];
  paese: Paese;
  data: Date;

  inserzione: Inserzione;

  
  constructor(public id: string, public navCtrl: NavController, public navParams: NavParams, public filtriService: FiltriService, public inserzioneService: InserzioneService, public utenteService: UtenteService) {
    this.filtriService.init()
    this.categorie = filtriService.categorie;
    this.materiali = filtriService.materiali;
    this.paesi = filtriService.paesi;
    this.inserzioneService.getDettaglioInserzione(id).subscribe(
      (inserzione) => {
        this.inserzione = inserzione;
      },
      (err) => {
        //Error handling
      }
    );


    this.categoria = this.inserzione.categoria;
    this.dataPubblicazione = this.inserzione.dataPubblicazione;
    this.id = this.inserzione.id;
    this.paese = this.inserzione.paese;
    this.prezzo = this.inserzione.prezzo;
    this.titolo = this.inserzione.titolo;
    this.descrizione = this.inserzione.descrizione;
    this.immagini = this.inserzione.immagini;
    this.materialiSelezionati = this.inserzione.materiali;
    this.data = this.inserzione.dataPubblicazione;
  
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModificaInserzionePage');
  }

  modifica() {
    let utente = this.utenteService.getUtenteLoggato();
    let inserzione: Inserzione = new Inserzione(this.immagini, this.titolo, this.prezzo, this.data,this.paese, this.id, this.descrizione, this.categoria, this.materialiSelezionati, utente)
    this.inserzioneService.modifyInserzione(inserzione);
  }

  aggiungiImmagine(){
    // const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE,
    //   correctOrientation: true,
  // }

    //Mi da errore Object(...) is not a function
    // this.camera.getPicture(options).then((imageData) => {
    //   let base64Image = 'data:image/jpeg;base64,' + imageData;
    // }, (err) => {
    //   console.log("errore");
    // });

    //Pure
  //   this.camera.getPicture(options).then(function(imageData) {
  //     this.picture = imageData;;
  //  }, function(err) {
  //     console.log(err);
  //  });
   //Internet non mi ha aiutato molto
  }

}
