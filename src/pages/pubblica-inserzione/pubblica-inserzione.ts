import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events, ViewController, AlertController } from 'ionic-angular';
import { Inserzione } from '../../model/inserzione';
import { FiltriService } from '../../services/filtri.service';
import { InserzioneService } from '../../services/inserzione.service';
import { UtenteService } from '../../services/utente.service';
import { Categoria } from '../../model/categoria';
import { Paese } from '../../model/paese';
import { Materiale } from '../../model/materiale';
import { TranslateService } from '@ngx-translate/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SelezioneImmagini } from './selezione-immagini';
/**
 * Generated class for the PubblicaInserzionePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pubblica-inserzione',
  templateUrl: 'pubblica-inserzione.html'
})
export class PubblicaInserzionePage {
  inserzione : Inserzione;
  categorie : Categoria[] = [];
  paesi : Paese[] = [];
  materiali : Materiale[] = [];
  idMateriali : number[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public filtriService: FiltriService, public inserzioneService: InserzioneService, public utenteService: UtenteService, public modalController : ModalController, public alertController : AlertController) {
    this.inserzione = new Inserzione([], "", 0, new Date(), {id:0,nome:"",nome_inglese:""}, "", "", {id:0, nome:"", nome_inglese:""}, [], utenteService.getUtenteLoggato());
    
    this.categorie = filtriService.getCategorie();
    this.paesi = filtriService.getPaesi();
    this.materiali = filtriService.getMateriali();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PubblicaInserzionePage');
  }

  pubblica() {
    this.inserzioneService.publishInserzione(this.inserzione).subscribe(
      (ok) => {
        this.showPublishSuccess();
      },
      (err) => {
        this.showPublishError();
      }
    );
  }

  showPublishSuccess(){
    this.alertController.create({
      title: "Inserzione pubblicata!",
      message: "La tua inserzione è stata pubblicata con successo. Buona fortuna!",
      buttons : [{
        text: "Ok!",
        handler: () => {
          this.navCtrl.pop();
        }
      }],
      enableBackdropDismiss: false
    }).present();
  }

  showPublishError(){
    this.alertController.create({
      title: "Oh no!",
      message: "Si è verificato un errore nella pubblicazione della tua inserzione. Riprova più tardi!",
      buttons : [{
        text: "Capito"
      }]
    }).present();
  }

  

  modalImmagini(){
    const modal = this.modalController.create(SelezioneImmagini, {immagini: this.inserzione.immagini});
    modal.present();
  }



}


