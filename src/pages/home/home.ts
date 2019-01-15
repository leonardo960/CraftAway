import { Component } from '@angular/core';
import { NavController, ModalController, PopoverController, ViewController, AlertController } from 'ionic-angular';
import { Inserzione } from "../../model/inserzione";
import { Ricerca } from "../../model/ricerca";
import { DETTAGLIO_INSERZIONE_PAGE, PUBBLICA_INSERZIONE_PAGE, FILTERS_PAGE, SORT_PAGE } from "../pages";
import { Paese } from '../../model/paese';
import { Categoria } from '../../model/categoria';
import { Materiale } from '../../model/materiale';
import { Events } from 'ionic-angular';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Utente } from '../../model/utente';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { Storage } from '@ionic/storage';
import { RicercaService } from "../../services/ricerca.service";
//import { InserzioneService } from "../../services/inserzione.service";

enum SortType{
  mostRecent,
  oldestOne,
  lowestPrice,
  highestPrice
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data: Observable<any>;
  inserzioni: Inserzione[];

  currentQuery: string;
  currentCountry: Paese;
  paeseBase = new Paese("0", "");
  currentCategory: Categoria;
  categoriaBase = new Categoria("0", "");
  currentMaterials: Materiale[];
  allMaterialsSelected: boolean;
  prezzoMin: number;
  prezzoMax: number;
  
  currentSort: SortType;
  currentSearch: Ricerca;

  constructor(public navCtrl: NavController, public httpClient: HttpClient, public modalCtrl: ModalController, public popCtrl: PopoverController, public events: Events, private storage: Storage, public ricercaService: RicercaService) {

    this.resetFilters();

    this.currentSort = SortType.mostRecent;
    this.updateCurrentSearch();

    events.subscribe('filters:applied', (allMaterialsSelected, newCountry, newCategory, newMaterials, newMinPrice, newMaxPrice) => {
      this.allMaterialsSelected = allMaterialsSelected;
      this.currentCountry = newCountry;
      this.currentCategory = newCategory;
      this.currentMaterials = newMaterials;
      this.prezzoMin = newMinPrice;
      this.prezzoMax = newMaxPrice;
      this.updateCurrentSearch();
      //this.inserzioneService.searchInserzioni(this.currentSearch);
    });

    events.subscribe('popmenu:saveSearch', () => {
      this.ricercaService.getRicerche().then((ricerche: Ricerca[]) => {
        if(ricerche != null){
          console.log(ricerche);
          let tempRicerche = ricerche;
          tempRicerche.unshift(this.updateCurrentSearch());
          this.ricercaService.saveRicerche(tempRicerche);
        }else{
          let newRicerche: Ricerca [];
          newRicerche = [];
          newRicerche.unshift(this.updateCurrentSearch());
          this.ricercaService.saveRicerche(newRicerche);
        }
      });
    });
    events.subscribe('sort:applied', (newSort) =>{
      this.currentSort = newSort;
      this.sortInserzioni();
    });
    events.subscribe('popmenu:gotoSavedSearch', () => {
      this.gotoSavedSearches();
    });
    events.subscribe('popmenu:resetSearch', () => {
      this.resetCurrentSearch();
    });
    events.subscribe('popmenu:deleteSearches', () => {
      this.ricercaService.deleteRicerche();
    });

    this.inserzioni = [];
    this.data = this.httpClient.get<Inserzione[]>("http://localhost:3000/inserzioni");
    this.data.subscribe(insertionsData => {
      for (let insertion of insertionsData) {
        this.inserzioni.unshift(insertion);
       }
       this.sortInserzioni();
    });

    /* this.inserzioni = [];
    this.data = this.httpClient.post<Ricerca>(URL.INSERZIONI_RICERCA, this.currentSearch);
    this.data.subscribe(insertionsData => {
      for (let insertion of insertionsData) {
        this.inserzioni.unshift(insertion);
       }
    }); */

  }

  getInserzioniLength(): number{
    return this.inserzioni.length;
  }

  searchbarInput(event){
    console.log("nuova ricerca");
    //this.inserzioneService.searchInserzioni(this.updateCurrentSearch());
  }

  updateCurrentSearch(){
    if(this.currentSearch == null){
      this.currentSearch = new Ricerca(this.currentQuery, this.currentCategory, this.currentCountry, this.currentMaterials, this.prezzoMin, this.prezzoMax);
    }else{
      this.currentSearch.categoria = this.currentCategory;
      this.currentSearch.paese = this.currentCountry;
      this.currentSearch.materiali= this.currentMaterials;
      this.currentSearch.prezzoMin = this.prezzoMin;
      this.currentSearch.prezzoMax = this.prezzoMax;
      this.currentSearch.query = this.currentQuery;
    }
    return this.currentSearch
  }

  gotoSavedSearches(){

  }

  resetCurrentSearch(){
    this.resetFilters();
    this.updateCurrentSearch();
  }

  compareInsertionsByDateInc(item1: Inserzione, item2: Inserzione): number {
    return new Date(item1.dataPubblicazione).getTime() - new Date(item2.dataPubblicazione).getTime();
  }

  compareInsertionsByDateDec(item1: Inserzione, item2: Inserzione): number {
    return new Date(item2.dataPubblicazione).getTime() - new Date(item1.dataPubblicazione).getTime();
  }

  compareInsertionsByPriceInc(item1: Inserzione, item2: Inserzione): number {
    return item1.prezzo - item2.prezzo;
  }

  compareInsertionsByPriceDec(item1: Inserzione, item2: Inserzione): number {
    return item2.prezzo - item1.prezzo;
  }

  sortInserzioni(){
    switch(+this.currentSort) { 
      case SortType.mostRecent: { 
        this.inserzioni.sort(this.compareInsertionsByDateInc);
        break;
      } 
      case SortType.oldestOne: {
        this.inserzioni.sort(this.compareInsertionsByDateDec);
        break; 
      } 
      case SortType.lowestPrice: {
        this.inserzioni.sort(this.compareInsertionsByPriceInc);
        break;    
      } 
      case SortType.highestPrice: { 
        this.inserzioni.sort(this.compareInsertionsByPriceDec);
        break; 
      }   
      default: {
        this.inserzioni.sort(this.compareInsertionsByDateInc); 
        break;              
      } 
    }
  }

  inserzioneTapped(idInserzione){
    this.navCtrl.push(DETTAGLIO_INSERZIONE_PAGE, {"idInserzione": idInserzione});
  }

  goToPostInserzione(){
      this.navCtrl.push(PUBBLICA_INSERZIONE_PAGE);
  }

  addInserzioneTapped(){
    this.goToPostInserzione();
  }

  showFilterModal() {
    const modal = this.modalCtrl.create(FILTERS_PAGE, {category: this.currentCategory, country: this.currentCountry, allMaterialsSelected: this.allMaterialsSelected, materials: this.currentMaterials, prezzomin: this.prezzoMin, prezzomax: this.prezzoMax});
    modal.present();
  }

  showSortModal() {
    const modal = this.modalCtrl.create(SORT_PAGE, {sortType: this.currentSort});
    modal.present();
  }

  resetFilters(){
    this.currentQuery = "";
    this.currentCountry = this.paeseBase;
    this.currentCategory = this.categoriaBase;
    this.currentMaterials = [];
    this.allMaterialsSelected = true;
    this.prezzoMin = -1;
    this.prezzoMax = -1;
  }

  showSearchMenu(myEvent){
      let popover = this.popCtrl.create(PopMenu);
      popover.present({
        ev: myEvent
      });
  }

}

@Component({
  template: 
  `
    
      <button ion-item (click)="saveSearch()">Save Search</button>
      <button ion-item (click)="resetCurrentSearch()">Reset Search</button>
      <button ion-item (click)="savedSearchTapped()">Your History</button>
      <button ion-item (click)="deleteSearches()">Delete History</button>
    
  `
})

export class PopMenu {
  constructor(public viewCtrl: ViewController, public events: Events, public alertCtrl: AlertController) {}

  close() {
    this.viewCtrl.dismiss();
  }

  saveSearch(){
    this.events.publish('popmenu:saveSearch');
    this.close();
  }

  savedSearchesTapped(){
    this.events.publish('popmenu:gotoSavedSearch');
    this.close();
  }

  resetCurrentSearch(){
    this.events.publish('popmenu:resetSearch');
    this.close();
  }

  deleteSearches(){
    let confirmPopup = this.alertCtrl.create({
      title: 'Delete History',
      message: 'Do you really want to delete your research history?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.close();
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.events.publish('popmenu:deleteSearches');
            this.close();
          }
        }
      ]
    });
    confirmPopup.present();

  }

}