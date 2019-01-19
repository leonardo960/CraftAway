import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatService } from "../../services/chat.service";
import { Conversazione } from "../../model/conversazione";
import { Messaggio } from "../../model/messaggio";
import { Utente } from "../../model/utente";
import { CHAT_PAGE } from "../pages";
import { UtenteService } from "../../services/utente.service";
/**
 * Generated class for the MessaggiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-messaggi',
  templateUrl: 'messaggi.html',
})

export class MessaggiPage {
  conversazioni: Conversazione[];

  constructor(public utenteService: UtenteService, public navCtrl: NavController, public navParams: NavParams, public chatService: ChatService) {
    chatService.getConversations().subscribe(
      (conversazioni) => {
        this.conversazioni = conversazioni;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessaggiPage');
  }

  conversazioneTapped(idConversazione){
    this.navCtrl.push(CHAT_PAGE, {"idConversazione": idConversazione});
  }

}
