import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpClient } from '../../../node_modules/@angular/common/http';

/**
 * Generated class for the SortPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

enum SortType{
  mostRecent,
  oldestOne,
  lowestPrice,
  highestPrice
}

@IonicPage()
@Component({
  selector: 'page-sort',
  templateUrl: 'sort.html',
})
export class SortPage {

  selectedSort: SortType;

  constructor(public navCtrl: NavController, public httpClient: HttpClient, public events: Events, public navParams: NavParams) {
    this.selectedSort = navParams.get("sortType");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SortPage');
  }

  applySort(){
    this.events.publish('sort:applied', this.selectedSort);
    this.navCtrl.pop();
  }

}
