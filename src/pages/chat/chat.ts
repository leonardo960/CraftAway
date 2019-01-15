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
  altroUtente: Utente;
  inputMessaggio: string;
  infiniteScrollEnabled: boolean;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, public chatService: ChatService, public utenteService: UtenteService) {
    this.chat = [];
    this.infiniteScrollEnabled = true;
    this.altroUtente = new Utente("AltroUtente", "altroutente@email.com", "password", new Date(), 2, 2, {}, []);
    chatService.getChat(navParams.get('idConversazione'), 0, 8).subscribe(
      (posts) => {
        for(var i = 0; i < 8; i++){
          if( i == 0){
            this.chat.unshift(new Messaggio(navParams.get('idConversazione'), utenteService.getUtenteLoggato(), this.altroUtente, new Date(), posts[i].body));
          } else {
            this.chat.unshift(new Messaggio(navParams.get('idConversazione'), this.altroUtente, utenteService.getUtenteLoggato(), new Date(), posts[i].body));
          }
        }
        this.content.scrollToBottom(0);
      },
      (err) => {
        //error handling
      }
    );
    /*chatService.getChat(navParams.get('idConversazione'), 0, 8).subscribe(
      (messaggi) => {
        this.chat = messaggi;
        this.content.scrollToBottom(0);
      },
      (err) => {
        //error handling
      }
    );*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  ionViewWillEnter() {

  }

  sendMessage(){
    let toSend = new Messaggio(this.navParams.get("idConversazione"), this.utenteService.getUtenteLoggato(), this.altroUtente, new Date(), this.inputMessaggio);
    this.chatService.sendMessage(toSend).subscribe(
      (postedObj) => {
        this.inputMessaggio = "";
        this.chat.push(toSend);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  loadMoreMessages(infiniteScroll){
    this.chatService.getChat(this.navParams.get('idConversazione'), this.chat.length, this.chat.length+8).subscribe(
      (posts) => {
        for(var i = this.chat.length; i < this.chat.length+8; i++){
          if(i >= posts.length){
            infiniteScroll.complete();
            this.infiniteScrollEnabled = false;
            return;
          }
          if( i % 2 == 0){
            this.chat.unshift(new Messaggio(this.navParams.get('idConversazione'), this.utenteService.getUtenteLoggato(), this.altroUtente, new Date(), posts[i].body));
          } else {
            this.chat.unshift(new Messaggio(this.navParams.get('idConversazione'), this.altroUtente, this.utenteService.getUtenteLoggato(), new Date(), posts[i].body));
          }
        }
        infiniteScroll.complete();
      },
      (err) => {
        //error handling
      }
    );
  }

}
