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
import { InserzioneService } from '../../services/inserzione.service';
import { TranslateService } from '@ngx-translate/core';
import { FiltriService } from '../../services/filtri.service';

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
  inserzioni: Inserzione[] = [];

  currentQuery: string;
  currentCountry: Paese;
  paeseBase : Paese;
  currentCategory: Categoria;
  categoriaBase : Categoria;
  currentMaterials: Materiale[];
  allMaterialsSelected: boolean;
  prezzoMin: number;
  prezzoMax: number;
  
  currentSort: SortType;
  currentSearch: Ricerca;

  constructor(public navCtrl: NavController, public httpClient: HttpClient, public modalCtrl: ModalController, public popCtrl: PopoverController, public events: Events, private storage: Storage, public ricercaService: RicercaService, public inserzioneService : InserzioneService, public translateService : TranslateService, public filtriService : FiltriService, public alertController : AlertController) {
    this.paeseBase = new Paese(0, "Tutta l'Europa", "Whole Europe")
    this.categoriaBase = new Categoria(0, "Tutte le Categorie", "All Categories");
    inserzioneService.searchInserzioni().subscribe(
      (results) => {
        this.inserzioni = results;
        this.currentSort = SortType.mostRecent;
        this.sortInserzioni();
      },
      (err) => {
        this.showSearchError();
      }
    );
    this.resetFilters();

    this.updateCurrentSearch();

   

    events.subscribe('filters:applied', (allMaterialsSelected, newCountry, newCategory, newMaterials, newMinPrice, newMaxPrice) => {
      this.allMaterialsSelected = allMaterialsSelected;
      this.currentCountry = newCountry;
      this.currentCategory = newCategory;
      this.currentMaterials = newMaterials;
      this.prezzoMin = newMinPrice;
      this.prezzoMax = newMaxPrice;
      this.updateCurrentSearch();
      this.inserzioneService.searchInserzioni(this.currentSearch).subscribe(
        (risultati) => {
          this.inserzioni = risultati;
        },
        (err) => {
          this.showSearchError();
        }
      );
    });

    events.subscribe('popmenu:saveSearch', () => {
      this.ricercaService.saveRicerca(this.currentSearch);
    });
    events.subscribe('sort:applied', (newSort) =>{
      this.currentSort = newSort;
      this.sortInserzioni();
    });
    events.subscribe('popmenu:resetSearch', () => {
      this.resetCurrentSearch();
    });
    events.subscribe('tapRicerca', (ricerca) => {
      this.currentCategory = ricerca.categoria;
      this.currentCountry = ricerca.paese;
      this.currentMaterials = ricerca.materiali;
      this.currentQuery = ricerca.query;
      this.currentSearch = ricerca;
      this.inserzioneService.searchInserzioni(this.currentSearch).subscribe(
        (risultati) => {
          this.inserzioni = risultati;
        },
        (err) => {
          this.showSearchError();
        }
      );
    });
    

  }

  showSearchError(){
    this.alertController.create({
      title: "Oh no!",
      message: "Si è verificato un errore durante la ricerca. Riprova più tardi!",
      buttons : ["Capito"]
    }).present();
  }

  getCurrentLang() : string{
    return this.translateService.currentLang;
  }



  getInserzioniLength(): number{
    return this.inserzioni.length;
  }

  searchbarInput(event){
    console.log("nuova ricerca");
    this.updateCurrentSearch();
    this.inserzioneService.searchInserzioni(this.updateCurrentSearch()).subscribe(
      (risultati) => {
        this.inserzioni = risultati;
      },
      (err) => {
        this.showSearchError();
      }
    );
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
    return this.currentSearch;
  }

  resetCurrentSearch(){
    this.resetFilters();
    this.updateCurrentSearch();
    this.inserzioneService.searchInserzioni().subscribe(
      (risultati) => {
        this.inserzioni = risultati;
      },
      (err) => {
        this.showSearchError();
      }
    );
  }

  compareInsertionsByDateInc(item1: Inserzione, item2: Inserzione): number {
    return new Date(item2.dataPubblicazione).getTime() - new Date(item1.dataPubblicazione).getTime();
  }

  compareInsertionsByDateDec(item1: Inserzione, item2: Inserzione): number {
    return new Date(item1.dataPubblicazione).getTime() - new Date(item2.dataPubblicazione).getTime();
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

  searchbarCancel(event){
    
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
      <ion-list style="margin: 0;" no-lines>
      <button ion-item (click)="saveSearch()">{{'POPMENU_SALVA_RICERCA' | translate}}</button>
      <button ion-item (click)="resetCurrentSearch()">{{'POPMENU_RESET_RICERCA' | translate}}</button>
      </ion-list>
  `
})

export class PopMenu {
  constructor(public viewCtrl: ViewController, public events: Events, public alertCtrl: AlertController, public translateService : TranslateService) {}

  close() {
    this.viewCtrl.dismiss();
  }

  saveSearch(){
    this.events.publish('popmenu:saveSearch');
    this.close();
  }

  resetCurrentSearch(){
    this.events.publish('popmenu:resetSearch');
    this.close();
  }

}