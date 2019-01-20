import { Injectable } from '@angular/core';
import { UtenteService } from "./utente.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL } from '../constants';
import { Inserzione } from '../model/inserzione';

@Injectable()
export class InserzioneService {
    //Non finito 
    constructor(public http: HttpClient, public utenteService: UtenteService) {

    }

    getDettaglio(idInserzione){
        let headers = new HttpHeaders();
        headers.append("idInserzione", idInserzione)
        return this.http.get<Inserzione>(URL.INSERZIONI_DETTAGLIO, {headers});
    }

    getInserzioniPubblicate(){
        return this.http.get<Inserzione[]>(URL.INSERZIONI);
    }

    publishInserzione(inserzione:Inserzione){
        return this.http.post<Inserzione>(URL.INSERZIONI, inserzione);
    }

    deleteInserzione(idInserzione){
        let headers = new HttpHeaders();
        headers.append("idInserzione", idInserzione)
        return this.http.delete<any>(URL.INSERZIONI, {headers:headers});
    }



}