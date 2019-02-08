import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, AlertController } from 'ionic-angular';
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
  chat: Messaggio[] = [];
  inputMessaggio: string;
  idConversazione : string;
  altroUtente : Utente = new Utente("", "", "", new Date(), 0, 0, []);
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, public chatService: ChatService, public utenteService: UtenteService, public alertController : AlertController) {
    this.idConversazione = navParams.get('idConversazione');
    chatService.getChat(this.idConversazione, 0, 1000).subscribe(
      (messaggi) => {
        if(messaggi[0].mittente.email == utenteService.getUtenteLoggato().email){
          this.altroUtente = messaggi[0].destinatario;
        } else {
          this.altroUtente = messaggi[0].mittente;
        }
        for(let i = 0; i < messaggi.length; i++){
          this.chat.push(new Messaggio(messaggi[i].idConversazione, messaggi[i].mittente as Utente, messaggi[i].destinatario as Utente, new Date(messaggi[i].timestamp as number), messaggi[i].testo));
        }
        this.checkNewMessages();
      },
      (err) => {
        this.showChatError();
      }
    );
    
  }

  ionViewDidLoad() {

  }

  showChatError(){
    this.alertController.create({
      title: "Oh no!",
      message: "Si è verificato un errore durante il recupero dei messaggi. Riprova più tardi!",
      buttons : [{
        text: "Capito",
        handler : () => {
          this.navCtrl.pop();
        }
      }]
    }).present();
  }


  checkNewMessages() {
    this.chatService.getChat(this.idConversazione, this.chat.length, 1000).subscribe(
      (messaggi) => {
        for(let i = 0; i < messaggi.length; i++){
          this.chat.push(new Messaggio(messaggi[i].idConversazione, messaggi[i].mittente as Utente, messaggi[i].destinatario as Utente, new Date(messaggi[i].timestamp as number), messaggi[i].testo));
        }
      },
      (err) => {
        //error handling
        console.log(JSON.stringify(err));
      }
    );
    if(this.navCtrl.last().instance instanceof ChatPage){
      setTimeout(() => {this.checkNewMessages();}, 2000);
    }
  }

  checkIfToday(timestamp){
    return new Date().getTime() - timestamp.getTime() < 86400000;
  }



  sendMessage(){
    let toSend = new Messaggio(this.idConversazione, this.utenteService.getUtenteLoggato(), this.altroUtente, new Date(), this.inputMessaggio);
    this.chatService.sendMessage(toSend).subscribe(
      (postedMessage) => {
        this.inputMessaggio = "";
      },
      (err) => {
        this.showSendMessageError();
      }
    )
  }

  showSendMessageError(){
    this.alertController.create({
      title: "Oh no!",
      message: "Si è verificato un errore durante l'invio del messaggio. Riprova più tardi!",
      buttons : [{
        text: "Capito"
      }]
    }).present();
  }




}
