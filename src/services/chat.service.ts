import { Conversazione } from "../model/conversazione";
import { Messaggio } from "../model/messaggio";
import {Observable} from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL } from '../constants';
@Injectable()
export class ChatService {
    conversazioni: Conversazione[];


    constructor(public http: HttpClient) {

    }

    getConversations(){
      let headers : HttpHeaders = new HttpHeaders();
      return this.http.get<Conversazione[]>(URL.CONVERSAZIONI);
    }

    getChat(idConversazione : string, base : number, offset : number){
      let headers : HttpHeaders = new HttpHeaders();
      headers.append("idChat", idConversazione);
      headers.append("base", base.toString());
      headers.append("offset", offset.toString());
      return this.http.get<Messaggio[]>(URL.CHAT, {headers : headers});
    }

    sendMessage(messaggio : Messaggio){
      return this.http.post<Messaggio>(URL.CHAT, messaggio, {headers: {"Content-type": "application/json; charset=UTF-8"}});
    }


}
