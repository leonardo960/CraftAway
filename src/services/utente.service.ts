import { Injectable } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Utente } from "../model/utente";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { URL } from '../constants';
import { Inserzione } from '../model/inserzione';

@Injectable()
export class UtenteService {
    utenteLoggato: Utente = null;
    activeToken : string = null;

    constructor(public http: HttpClient, public storage: Storage, public chatService : ChatService) {
      
    }

    init(){
      this.storage.get("utente").then(
        (utente) => {
          if(utente){
            this.utenteLoggato = utente;
          }
        }
      );
      this.storage.get("token").then(
        (token) => {
          if(token){
            this.activeToken = token;
          }
        }
      );
    }

    login(email : string, password : string){
      let headers = new HttpHeaders({"email" : email, "password" : password});
      return this.http.get<any>(URL.ACCOUNT, {observe: 'response', headers : headers});
    }

    signup(utente : Utente){
      return this.http.post<Utente>(URL.ACCOUNT, utente, {observe : 'response', headers: {"Content-type": "application/json; charset=UTF-8"}});
    }

    logout(){
      this.utenteLoggato = null;
      this.activeToken = null;
      this.storage.remove("utente");
      this.storage.remove("token");
    }

    deleteAccount(){
      return this.http.delete<any>(URL.ACCOUNT);
    }

    modifyProfile(utente : Utente){
      return this.http.put<Utente>(URL.ACCOUNT, utente, {headers: {"Content-type": "application/json; charset=UTF-8"}});
    }

    getUtenteLoggato(){
      return this.utenteLoggato;
    }

    setUtenteLoggato(utente : Utente){
      this.utenteLoggato = utente;
      this.storage.set("utente", utente);
    }

    getActiveToken(){
      return this.activeToken;
    }

    setActiveToken(token : string){
      this.activeToken = token;
      this.storage.set("token", token);
    }

    getInserzioniPreferite() {
      return this.http.get<any>(URL.PREFERITI);
    }

    deleteInserzionePreferita(idInserzione) {
      return this.http.delete<any>(URL.PREFERITI, {params : {"idInserzione" : idInserzione}});
    }

    addInserzionePreferita(idInserzione) {
      return this.http.post<any>(URL.PREFERITI,{},{params : {"idInserzione" : idInserzione}});
    }



}
