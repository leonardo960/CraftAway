import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Ricerca } from '../../model/ricerca';
import { Categoria } from '../../model/categoria';
import { Paese } from '../../model/paese';
import { Materiale } from '../../model/materiale';

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
  ricerche : Ricerca[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let ricerca1 = new Ricerca("spade", new Categoria("1", "Armi"), new Paese("1", "Italia"), [new Materiale("1", "Acciaio"), new Materiale("3", "Bronzo")], 50, 250);
    let ricerca2 = new Ricerca("banane", new Categoria("2", "Cibo"), new Paese("1", "Polonia"), [new Materiale("2", "Organico")], 5, 25);
    this.ricerche = [ricerca1, ricerca2];

    /*
    prenderle dallo storage e caricarle in ricerche;
    */
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RicerchePage');
  }

  eliminaRicerca(ricerca : Ricerca){
    //vai nello storage e rimuovi questa ricerca;
  }

  ricercaTapped(ricerca : Ricerca){
    //Effettua questa ricerca
    //this.navCtrl.push(HOME_PAGE, ricerca) forse?
  }

}
