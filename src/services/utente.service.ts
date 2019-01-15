import { Injectable } from '@angular/core';

import { Utente } from "../model/utente";
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable()
export class UtenteService {
    utenteLoggato: Utente;
    activeToken : string;

    constructor(public http: HttpClient, public storage: Storage) {
      http.get<any>("https://jsonplaceholder.typicode.com/users/1").subscribe(
        (user) => {
          this.utenteLoggato = new Utente(user.name, user.email, "password", new Date(), 2, 2, {}, []);
        },
        (err) => {
          //error handling
        }
      );
      storage.get("utente").then(
        (utente: Utente) => {
          if(utente != null){
            this.utenteLoggato = utente;
          }
        }
      );
      
    }

    login(email : string, password : string){

    }

    signup(utente){

    }

    logout(){

    }

    deleteAccount(){

    }

    changeLanguage(lingua){

    }

    modifyProfile(utente){

    }

    getUtenteLoggato(){
      return this.utenteLoggato;
    }

    getActiveToken(){
      return this.activeToken;
    }


}
