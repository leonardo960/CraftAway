import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Materiale } from '../../model/materiale';
import { Categoria } from '../../model/categoria';
import { Paese } from '../../model/paese';
import { Events } from 'ionic-angular';
import { FiltriService } from '../../services/filtri.service';
import { TranslateService } from '@ngx-translate/core';


@IonicPage()
@Component({
  selector: 'page-filtri',
  templateUrl: 'filtri.html',
})
export class FiltriPage {

  countries: Paese[];
  categories: Categoria[];
  materials: Materiale[];

  previousCountry: Paese;
  previousCategory: Categoria;
  previousMaterials: Materiale[];

  currentCountry: Paese;
  currentCategory: Categoria;
  currentMaterials: Materiale[];
  currentCountryID: number;
  currentCategoryID: number;
  currentMaterialsID: number[];
  allMaterialsSelected: boolean;

  priceRange: number;
  prezzoMin: number;
  prezzoMax: number;

  materialiSelectPlaceholder : string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public filtriService : FiltriService, public translateService : TranslateService) {
    this.previousCountry = this.navParams.get("country");
    this.previousCategory = this.navParams.get("category");
    this.previousMaterials = this.navParams.get("materials");
    this.prezzoMin = this.navParams.get("prezzomin");
    this.prezzoMax = this.navParams.get("prezzomax");

    switch(this.prezzoMin) { 
      case -1: { 
        this.priceRange = 0;
        break;
      } 
      case 0: { 
        this.priceRange = 1; 
        break; 
      } 
      case 20: {
        this.priceRange = 2;
        break;    
      } 
      case 50: { 
        this.priceRange = 3; 
        break; 
      }  
      case 100: { 
        this.priceRange = 4; 
        break; 
      }  
      case 200: { 
        this.priceRange = 5; 
        break; 
      }  
      default: { 
        this.priceRange = 0; 
        break;              
      } 
    }

    this.currentCountryID = this.previousCountry.id;
    this.currentCategoryID = this.previousCategory.id;
    this.currentMaterialsID = []
    for(let i = 0; i < this.previousMaterials.length; i++){
      this.currentMaterialsID.push(this.previousMaterials[i].id);
    }
    this.allMaterialsSelected = this.navParams.get("allMaterialsSelected");
    if(this.allMaterialsSelected){
      this.translateService.get("PLACEHOLDER_TUTTI_MATERIALI").subscribe(
        (translation) => {
          this.materialiSelectPlaceholder = translation;
        }
      );
    } else {
      this.translateService.get("PLACEHOLDER_SELEZIONA_MATERIALI").subscribe(
        (translation) => {
          this.materialiSelectPlaceholder = translation;
        }
      );
    }
    this.countries = filtriService.getPaesi();
    
    this.categories = filtriService.getCategorie();
    
    this.materials = filtriService.getMateriali();
  }

  toggleMaterialsSelected(){
    if(this.allMaterialsSelected){
      this.translateService.get("PLACEHOLDER_TUTTI_MATERIALI").subscribe(
        (translation) => {
          this.materialiSelectPlaceholder = translation;
        }
      );
    } else {
      this.translateService.get("PLACEHOLDER_SELEZIONA_MATERIALI").subscribe(
        (translation) => {
          this.materialiSelectPlaceholder = translation;
        }
      );
    }
  }

  getCurrentLang() : string {
    return this.translateService.currentLang;
  }

  compareCountriesByName(item1: Paese, item2: Paese): number {
    if(item1.nome == item2.nome) return 0;
    if(item1.nome > item2.nome){
      return 1;
    }
    return -1;
  }
  compareCategoriesByName(item1: Categoria, item2: Categoria): number {
    if(item1.nome == item2.nome) return 0;
    if(item1.nome > item2.nome){
      return 1;
    }
    return -1;
  }
  compareMaterialsByName(item1: Materiale, item2: Materiale): number {
    if(item1.nome == item2.nome) return 0;
    if(item1.nome > item2.nome){
      return 1;
    }
    return -1;
  }

  idToItems(){
    for(let country of this.countries){
      if(country.id == this.currentCountryID){
        this.currentCountry = country;
      }
    }

    for(let category of this.categories){
      if(category.id == this.currentCategoryID){
        this.currentCategory = category;
      }
    }
    this.currentMaterials = [];
    if(this.allMaterialsSelected || this.currentMaterialsID.length == 0){
      this.allMaterialsSelected = true;
      for(let material of this.materials){
       this.currentMaterials.push(material);
      }
    }else{
      for(let newMaterialID of this.currentMaterialsID){
        for(let material of this.materials){
          if(material.id == newMaterialID){
            this.currentMaterials.push(material);
          }
        }
      }
    }

    switch(this.priceRange) { 
      case 0: { 
        this.prezzoMin = -1;
        this.prezzoMax = -1;
        break;
      } 
      case 1: { 
        this.prezzoMin = 0;
        this.prezzoMax = 20;
        break; 
      } 
      case 2: {
        this.prezzoMin = 20;
        this.prezzoMax = 50;
        break;    
      } 
      case 3: { 
        this.prezzoMin = 50;
        this.prezzoMax = 100; 
        break; 
      }  
      case 4: { 
        this.prezzoMin = 100;
        this.prezzoMax = 200; 
        break; 
      }  
      case 5: { 
        this.prezzoMin = 200;
        this.prezzoMax = -1; 
        break; 
      }  
      default: { 
        this.prezzoMin = -1;
        this.prezzoMax = -1; 
        break;              
      } 
    }
  }

  applyFilters(){
    this.idToItems();
    this.events.publish('filters:applied', this.allMaterialsSelected, this.currentCountry, this.currentCategory, this.currentMaterials, this.prezzoMin, this.prezzoMax);
    this.navCtrl.pop();
  }
}
