import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL } from '../constants';
import { Inserzione } from "../model/inserzione";
import { Ricerca } from '../model/ricerca';
@Injectable()
export class InserzioneService {
    constructor(public http: HttpClient) {

    }

    getYourInserzioni(){
      return this.http.get<any>(URL.INSERZIONI);
    }

    publishInserzione(inserzione : Inserzione){
      return this.http.post<any>(URL.CHAT, inserzione, {headers: {"Content-type": "application/json; charset=UTF-8"}});
    }

    getDettaglioInserzione(idInserzione: string){
      return this.http.get<Inserzione>(URL.INSERZIONI_DETTAGLIO, {params : {"idInserzione" : idInserzione}});
    }

    deleteInserzione(idInserzione: string){
      let headers : HttpHeaders = new HttpHeaders({"idInserzione" : idInserzione});
      return this.http.delete<any>(URL.INSERZIONI, {headers: headers});
    }

    modifyInserzione(inserzione: Inserzione){
      return this.http.put<any>(URL.INSERZIONI, inserzione);
    }

    getInserzioneOfUtente(idUtente: string){
      let headers : HttpHeaders = new HttpHeaders({"idUtente" : idUtente});
      return this.http.get<Inserzione[]>(URL.INSERZIONI_PER_UTENTE, {headers: headers});
    }
    
    searchInserzioni(ricerca: Ricerca = null){
      if(ricerca == null){
        ricerca = new Ricerca("", {"id":0, "nome":"", "nome_inglese":""}, {"id":0, "nome":"", "nome_inglese":""}, [], -1, -1);
        return this.http.post<Inserzione[]>(URL.INSERZIONI_RICERCA, ricerca, {headers: {"Content-type": "application/json; charset=UTF-8"}});
      } else {
        return this.http.post<Inserzione[]>(URL.INSERZIONI_RICERCA, ricerca, {headers: {"Content-type": "application/json; charset=UTF-8"}});
      }
    }

    
}