import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Categoria } from '../../model/categoria';
import { Materiale } from '../../model/materiale';
import { Paese } from '../../model/paese';
import { FiltriService } from '../../services/filtri.service';
import { InserzioneService } from '../../services/inserzione.service';
import { Inserzione } from '../../model/inserzione';
import { SelezioneImmagini } from '../pubblica-inserzione/selezione-immagini';

/**
 * Generated class for the ModificaInserzionePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modifica-inserzione',
  templateUrl: 'modifica-inserzione.html'
})
export class ModificaInserzionePage {
  inserzione : Inserzione = new Inserzione([], "", 0, new Date(), {id:0,nome:"",nome_inglese:""}, "", "", {id:0, nome:"", nome_inglese:""}, [], {dataIscrizione:new Date(),email:"", inserzioni:[], nome:"", password:"", inserzioniOnline:0, inserzioniPubblicate:0});
  categorie : Categoria[] = [];
  paesi : Paese[] = [];
  materiali : Materiale[] = []; 
  idMateriali : number[] = [];
  constructor(public id: string, public navCtrl: NavController, public navParams: NavParams, public filtriService: FiltriService, public inserzioneService: InserzioneService, public alertController : AlertController, public modalController : ModalController) {
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModificaInserzionePage');
  }

  showModifySuccess(){
    this.alertController.create({
      title: "Inserzione modificata",
      message: "La tua inserzione è stata modificata con successo",
      buttons : [{
        text: "Capito",
        handler: () => {
          this.navCtrl.pop();
        }
      }],
      enableBackdropDismiss: false
    }).present();
  }

  showModifyError(){
    this.alertController.create({
      title: "Oh no!",
      message: "Si è verificato un errore nella pubblicazione della tua inserzione. Riprova più tardi!",
      buttons : [{
        text: "Capito"
      }]
    }).present();
  }

  confermaModifiche() {
    this.inserzioneService.modifyInserzione(this.inserzione).subscribe(
      (ok) => {
        this.showModifySuccess();
      },
      (err) => {
        this.showModifyError();
      }
    );
  }

  modalImmagini(){
    const modal = this.modalController.create(SelezioneImmagini, {immagini: this.inserzione.immagini});
    modal.present();
  }

  

}
