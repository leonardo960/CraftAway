import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Inserzione } from '../../model/inserzione';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { InserzioneService } from '../../services/inserzione.service';
@IonicPage()
@Component({
  selector: 'page-dettaglio-inserzione',
  templateUrl: 'dettaglio-inserzione.html',
})
export class DettaglioInserzionePage {
  inserzione: Inserzione;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, public inserzioneService : InserzioneService) {
    let insertionId = this.navParams.get("idInserzione");
    
    inserzioneService.getDettaglioInserzione(insertionId).subscribe(
      (inserzione) => {
        this.inserzione = inserzione;
      },
      (err) => {
        //Error handling
      }
    );

  }

  getMoreHumanDate(): string{
    let tempDate = new Date(this.inserzione.dataPubblicazione);
    return tempDate.getDay() + "/" + tempDate.getMonth() + "/" + tempDate.getFullYear();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DettaglioInserzionePage');
  }

}
