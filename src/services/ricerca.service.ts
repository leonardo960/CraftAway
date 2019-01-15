import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Ricerca } from '../model/ricerca';

@Injectable()
export class RicercaService {

    ricercheKey = "ricerche";

    constructor(public http: HttpClient, private storage: Storage) {

    }

    getRicerche(){
        return this.storage.get(this.ricercheKey);
    }

    saveRicerche(newRicerche: Ricerca[]){
        return this.storage.set(this.ricercheKey, newRicerche);
    }
    
    deleteRicerche(){
        return this.storage.remove(this.ricercheKey);
    }

}