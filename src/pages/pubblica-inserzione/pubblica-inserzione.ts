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
  providers: [InserzioneService, FiltriService, UtenteService]
})
export class PubblicaInserzionePage {
  categorie: Categoria[];
  materiali: Materiale[];
  paesi: Paese[];
  immagini: string[];
  dataPubblicazione: Date; //la classe built-in per le date di Typescript è "Date"
  id: string; //(eventualmente codificato con qualcosa tipo base64)
  titolo: string;
  prezzo: number;
  descrizione: string;
  categoria: Categoria;
  materialiSelezionati: Materiale[];
  paese: Paese;

  
  constructor(public navCtrl: NavController, public navParams: NavParams, public filtriService: FiltriService, public inserzioneService: InserzioneService, public utenteService: UtenteService) {
    //Non so perchè non parte da solo su pc mio l'ngOnInit

    

    this.filtriService.init()
    this.categorie = filtriService.categorie;
    this.materiali = filtriService.materiali;
    this.paesi = filtriService.paesi;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PubblicaInserzionePage');
  }

  pubblica() {
    let utente = this.utenteService.getUtenteLoggato();
    let data = new Date();
    let id = "";

    let inserzione: Inserzione = new Inserzione(this.immagini, this.titolo, this.prezzo, data,this. paese, id, this.descrizione, this.categoria, this.materialiSelezionati, utente)

    console.log(inserzione);
    console.log(this.categoria.nome);
    this.inserzioneService.publishInserzione(inserzione);
  }

  aggiorna(){
    this.filtriService.init()
    this.categorie = this.filtriService.categorie;
    this.materiali = this.filtriService.materiali;
    this.paesi = this.filtriService.paesi;
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
