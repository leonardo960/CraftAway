import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  conversazioni: Conversazione[] = [];
  conversazioniLoaded : boolean = false;
  constructor(public utenteService: UtenteService, public navCtrl: NavController, public navParams: NavParams, public chatService: ChatService, public alertController : AlertController) {
    chatService.getConversations().subscribe(
      (conversazioni) => {
          for(let i = 0; i < conversazioni.length; i++){
            let ultimoMessaggio = new Messaggio(conversazioni[i].id, conversazioni[i].messaggi[0].mittente as Utente, conversazioni[i].messaggi[0].destinatario as Utente, new Date(conversazioni[i].messaggi[0].timestamp as number), conversazioni[i].messaggi[0].testo);
            if(conversazioni[i].utente1.email == utenteService.getUtenteLoggato().email){
              this.conversazioni.push(new Conversazione(conversazioni[i].id, utenteService.getUtenteLoggato(), conversazioni[i].utente2 as Utente, [ultimoMessaggio]));
            } else {
              this.conversazioni.push(new Conversazione(conversazioni[i].id, utenteService.getUtenteLoggato(), conversazioni[i].utente1 as Utente, [ultimoMessaggio]));
            }
          }
          this.conversazioniLoaded = true;
      },
      (err) => {
        this.showConversazioniError();
      }
    );
  }

  showConversazioniError(){
    this.alertController.create({
      title: "Oh no!",
      message: "Si è verificato un errore nel recupero delle tue chat. Riprova più tardi!",
      buttons : [{
        text: "Capito",
        handler : () => {
          this.navCtrl.pop();
        }
      }]
    }).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessaggiPage');
  }

  ionViewWillEnter(){
    if(this.conversazioniLoaded){
      this.conversazioni = [];
      this.chatService.getConversations().subscribe(
        (conversazioni) => {
            for(let i = 0; i < conversazioni.length; i++){
              let ultimoMessaggio = new Messaggio(conversazioni[i].id, conversazioni[i].messaggi[0].mittente as Utente, conversazioni[i].messaggi[0].destinatario as Utente, new Date(conversazioni[i].messaggi[0].timestamp as number), conversazioni[i].messaggi[0].testo);
              if(conversazioni[i].utente1.email == this.utenteService.getUtenteLoggato().email){
                this.conversazioni.push(new Conversazione(conversazioni[i].id, this.utenteService.getUtenteLoggato(), conversazioni[i].utente2 as Utente, [ultimoMessaggio]));
              } else {
                this.conversazioni.push(new Conversazione(conversazioni[i].id, this.utenteService.getUtenteLoggato(), conversazioni[i].utente1 as Utente, [ultimoMessaggio]));
              }
            }
        },
        (err) => {
          this.showConversazioniError();
        }
      );
    }
    
  }


  conversazioneTapped(idConversazione){
    this.navCtrl.push(CHAT_PAGE, {"idConversazione": idConversazione});
  }

}
