import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PREFERITI_PAGE, RICERCHE_PAGE } from '../pages';


/**
 * Generated class for the SalvatiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-salvati',
  templateUrl: 'salvati.html',
})
export class SalvatiPage {
  preferiti = PREFERITI_PAGE;
  ricerche = RICERCHE_PAGE;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalvatiPage');
  }

}
