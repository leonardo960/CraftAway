import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, App } from 'ionic-angular';
import { Ricerca } from '../../model/ricerca';
import { RicercaService } from '../../services/ricerca.service';

/**
 * Generated class for the RicerchePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ricerche',
  templateUrl: 'ricerche.html',
})
export class RicerchePage {
  ricerche : Ricerca[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public ricercaService : RicercaService, public events : Events, public app : App) {
    ricercaService.getRicerche().then(
      (ricerche) => {
        if(ricerche)
          this.ricerche = ricerche;
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RicerchePage');
  }

  eliminaRicerca(ricerca : Ricerca){
    this.ricerche.splice(this.ricerche.indexOf(ricerca), 1);
    this.ricercaService.deleteRicerca(ricerca);
  }

  ricercaTapped(ricerca : Ricerca){
    this.events.publish("tapRicerca", ricerca);
    this.app.getRootNav().popToRoot();
  }

}
