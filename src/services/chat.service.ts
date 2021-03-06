import { Conversazione } from "../model/conversazione";
import { Messaggio } from "../model/messaggio";
import {Observable} from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL } from '../constants';
@Injectable()
export class ChatService {

    constructor(public http: HttpClient) {

    }

    getConversations(){
      return this.http.get<any>(URL.CONVERSAZIONI);
    }

    getChat(idConversazione : string, base : number, offset : number){
      return this.http.get<any>(URL.CHAT, {params : {"idChat" : idConversazione, "base" : base.toString(), "offset" : offset.toString()}});
    }

    sendMessage(messaggio : Messaggio){
      return this.http.post<Messaggio>(URL.CHAT, messaggio, {headers: {"Content-type": "application/json; charset=UTF-8"}});
    }


}
