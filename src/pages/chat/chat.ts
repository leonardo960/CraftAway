import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { Messaggio } from "../../model/messaggio";
import { ChatService } from "../../services/chat.service";
import { UtenteService } from "../../services/utente.service";
import { Utente } from "../../model/utente";
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  chat: Messaggio[];
  inputMessaggio: string;
  idConversazione : string;
  infiniteScrollEnabled: boolean;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, public chatService: ChatService, public utenteService: UtenteService) {
    this.chat = [];
    this.infiniteScrollEnabled = true;
    this.idConversazione = navParams.get('idConversazione');
    chatService.getChat(this.idConversazione, 0, 8).subscribe(
      (messaggi) => {
        messaggi.sort((messaggio1 : Messaggio, messaggio2 : Messaggio) : number => {
          return messaggio2.timestamp.getTime() - messaggio1.timestamp.getTime();
        });
        this.chat = messaggi;
        this.content.scrollToBottom(0);
      },
      (err) => {
        //error handling
        console.log(err);
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  ionViewWillEnter() {

  }

  sendMessage(){
    let toSend = new Messaggio(this.idConversazione, this.utenteService.getUtenteLoggato(), new Utente("", "", "", new Date(), 0, 0, {}, []), new Date(), this.inputMessaggio);
    this.chatService.sendMessage(toSend).subscribe(
      (postedMessage) => {
        this.inputMessaggio = "";
        this.chat.push(toSend);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  loadMoreMessages(infiniteScroll){
    this.chatService.getChat(this.idConversazione, this.chat.length, this.chat.length+8).subscribe(
      (messaggi) => {
        messaggi.sort((messaggio1 : Messaggio, messaggio2 : Messaggio) : number => {
          return messaggio2.timestamp.getTime() - messaggio1.timestamp.getTime();
        });
        this.chat = messaggi.concat(this.chat);
        infiniteScroll.complete();
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
