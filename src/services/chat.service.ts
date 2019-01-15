import { Conversazione } from "../model/conversazione";
import { Messaggio } from "../model/messaggio";
import { Utente } from "../model/utente";
import {Observable} from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { UtenteService } from "./utente.service";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChatService {
    conversazioni: Conversazione[];


    constructor(public http: HttpClient, public utenteService: UtenteService) {

    }

    getConversations(){
      return this.http.get<any>("https://jsonplaceholder.typicode.com/posts/1");
    }

    getChat(idConversazione, base, offset){
      return this.http.get<any>("https://jsonplaceholder.typicode.com/posts");
    }

    sendMessage(messaggio){
      return this.http.post<any>("https://jsonplaceholder.typicode.com/posts", {title: 'foo', body: 'bar', userId: 1}, {headers: {"Content-type": "application/json; charset=UTF-8"}});
    }


}
