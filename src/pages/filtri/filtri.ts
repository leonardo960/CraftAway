import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Materiale } from '../../model/materiale';
import { Categoria } from '../../model/categoria';
import { Paese } from '../../model/paese';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { URL_BASE, URL } from "../../constants"
import { HttpClient } from '@angular/common/http';
import { Events } from 'ionic-angular';
import { ValueTransformer } from '../../../node_modules/@angular/compiler/src/util';



@IonicPage()
@Component({
  selector: 'page-filtri',
  templateUrl: 'filtri.html',
})
export class FiltriPage {

  data1: Observable<any>;
  data2: Observable<any>;
  data3: Observable<any>;

  countries: Paese[];
  categories: Categoria[];
  materials: Materiale[];

  previousCountry: Paese;
  previousCategory: Categoria;
  previousMaterials: Materiale[];

  currentCountry: Paese;
  currentCategory: Categoria;
  currentMaterials: Materiale[];
  currentCountryID: string;
  currentCategoryID: string;
  currentMaterialsID: string[];
  allMaterialsSelected: boolean;

  currentMaterial: string;

  priceRange: number;
  prezzoMin: number;
  prezzoMax: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, public events: Events) {
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
    this.currentMaterialsID = [];
    this.allMaterialsSelected = this.navParams.get("allMaterialsSelected");
    
    this.countries = [];
    this.countries.unshift(new Paese("0", ""));
    this.data1 = this.httpClient.get<any>("https://jsonplaceholder.typicode.com/users");
    this.data1.subscribe(countriesData => {
      for (let country of countriesData) {
        this.countries.unshift(new Paese(country.id, country.name));
       }
      this.countries.sort(this.compareCountriesByName);
    })
    
    this.categories = [];
    this.categories.unshift(new Categoria("0", ""));
    this.data2 = this.httpClient.get<any>("https://jsonplaceholder.typicode.com/users");
    this.data2.subscribe(categoriesData => {
      for (let category of categoriesData) {
        this.categories.unshift(new Categoria(category.id, category.name));
       }
       this.categories.sort(this.compareCategoriesByName)
    })
    
    this.materials = [];
    if(!this.allMaterialsSelected){
      for(let startingMaterial of this.previousMaterials){
        this.currentMaterialsID.push(startingMaterial.id);
      }
    }
    this.data3 = this.httpClient.get<any>("https://jsonplaceholder.typicode.com/users");
    this.data3.subscribe(materialsData => {
      for (let material of materialsData) {
        this.materials.unshift(new Materiale(material.id, material.name));
       }
       this.materials.sort(this.compareMaterialsByName)
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltriPage');
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
