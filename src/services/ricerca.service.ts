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

    saveRicerca(ricerca: Ricerca) : void{
        this.storage.get(this.ricercheKey).then(
            (ricerche : Ricerca[]) => {
                if(ricerche == null){
                    this.storage.set(this.ricercheKey, [ricerca]);
                } else {
                    ricerche.push(ricerca);
                    this.storage.set(this.ricercheKey, ricerche);
                }
            }
        )
    }
    
    deleteRicerca(ricerca : Ricerca) : void{
        this.storage.get(this.ricercheKey).then(
            (ricerche : Ricerca[]) => {
                ricerche = ricerche.splice(ricerche.indexOf(ricerca), 1);
                this.storage.set(this.ricercheKey, ricerche);
            }
        );
    }

}