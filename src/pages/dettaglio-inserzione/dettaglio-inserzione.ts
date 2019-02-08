import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, ViewController, PopoverController, Events } from 'ionic-angular';
import { Inserzione } from '../../model/inserzione';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { InserzioneService } from '../../services/inserzione.service';
import { UtenteService } from '../../services/utente.service';
import { ChatService } from '../../services/chat.service';
import { AlertController } from 'ionic-angular';
import { CHAT_PAGE, LOGIN_PAGE } from '../pages';
import { Messaggio } from '../../model/messaggio';
import { Utente } from '../../model/utente';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-dettaglio-inserzione',
  templateUrl: 'dettaglio-inserzione.html',
})
export class DettaglioInserzionePage {
  inserzione: Inserzione = {"categoria": {"id":0, "nome":"", "nome_inglese":""}, "dataPubblicazione": new Date(), "descrizione":"", "id":"0", "immagini":[], "inserzionista" : {"dataIscrizione":new Date(), "email":"", "inserzioni":[], "inserzioniOnline":0, "inserzioniPubblicate":0, "nome":"", "password":""}, "materiali":[], "paese":{"id":0, "nome":"", "nome_inglese":""}, "prezzo":0, "titolo":""};
  utenteLoggato : Utente;
  isInserzionePreferita : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, public inserzioneService : InserzioneService, public chatService : ChatService, public alertController : AlertController, public utenteService : UtenteService, public popController : PopoverController, public events : Events, public translateService : TranslateService) {
    this.utenteLoggato = this.utenteService.getUtenteLoggato() != null ? this.utenteService.getUtenteLoggato() : new Utente("", "", "", new Date(), 0, 0, []);
    let insertionId = this.navParams.get("idInserzione");
    this.inserzioneService.getDettaglioInserzione(insertionId).subscribe(
      (inserzione) => {
        this.inserzione = inserzione;
        this.setIsInserzionePreferita();
      },
      (err) => {
        this.showInserzioneError();
      }
    );
    events.subscribe("invia-messaggio", (messaggio) => {
      this.chatService.sendMessage(new Messaggio("0", this.utenteService.getUtenteLoggato(), this.inserzione.inserzionista, new Date(), messaggio)).subscribe(
        (newConversationId) => {
          this.navCtrl.push(CHAT_PAGE, {"idConversazione" : newConversationId});
        },
        (err) => {
          this.showContattoError();
        }
      );
    });
  }

  getCurrentLang(){
    return this.translateService.currentLang;
  }

  showInserzioneError(){
    this.alertController.create({
      title: "Oh no!",
      message: "Si è verificato un errore durante la visualizzazione dell'inserzione. Riprova più tardi!",
      buttons : [{
        text: "Capito",
        handler : () => {
          this.navCtrl.pop();
        }
      }]
    }).present();
  }

  showContattoError(){
    this.alertController.create({
      title: "Oh no!",
      message: "Si è verificato un errore nel contattare l'inserzionista. Riprova più tardi!",
      buttons : [{
        text: "Capito"
      }]
    }).present();
  }

  setIsInserzionePreferita(){
    this.utenteService.getInserzioniPreferite().subscribe(
      (preferiti) => {
        for(let i = 0; i < preferiti.length; i++){
          if(preferiti[i].id == this.inserzione.id){
            this.isInserzionePreferita = true;
          }
        }
      }
    );
  }

  ionViewWillLeave(){
    this.events.publish("refreshPreferiti");
  }


  contattaInserzionista() : void {
    if(this.utenteService.getUtenteLoggato() != null){
      this.chatService.getConversations().subscribe(
        (conversazioni) => {
          for(let i = 0; i < conversazioni.length; i++){
            if(conversazioni[i].utente1.email == this.inserzione.inserzionista.email || conversazioni[i].utente2.email == this.inserzione.inserzionista.email){
              this.navCtrl.push(CHAT_PAGE, {"idConversazione" : conversazioni[i].id});
              return;
            }
          }
          this.showFirstMessagePopup();
        },
        (err) => {
          this.showContattoError();
        }
      );
    } else {
      this.navCtrl.push(LOGIN_PAGE);
    }
    
  }

  showFirstMessagePopup() : void {
    let popover = this.popController.create(NewMessageModal, {"titolo" : this.inserzione.titolo});
      popover.present({
      });
    
  }

  showAddPreferitoError(){
    this.alertController.create({
      title: "Oh no!",
      message: "Si è verificato un errore nell'aggiungere l'inserzione ai preferiti. Riprova più tardi!",
      buttons : [{
        text: "Capito"
      }]
    }).present();
  }

  showRemovePreferitoError(){
    this.alertController.create({
      title: "Oh no!",
      message: "Si è verificato un errore nel rimuovere l'inserzione dai preferiti. Riprova più tardi!",
      buttons : [{
        text: "Capito"
      }]
    }).present();
  }

  showRecuperaPreferitiError(){
    this.alertController.create({
      title: "Oh no!",
      message: "Si è verificato un errore nella gestione delle inserzioni preferite. Riprova più tardi!",
      buttons : [{
        text: "Capito"
      }]
    }).present();
  }

  addRemovePreferito(idPreferito : string){
    if(this.utenteLoggato.email != ""){
    this.utenteService.getInserzioniPreferite().subscribe(
      (preferiti) => {
        for(let i = 0; i < preferiti.length; i++){
          if(preferiti[i].id == idPreferito){
            this.utenteService.deleteInserzionePreferita(idPreferito).subscribe(
              (ok) => {
                this.isInserzionePreferita = false;
              },
              (err) => {
                this.showRemovePreferitoError();
              }
            );
            return;
          }
        }
        this.utenteService.addInserzionePreferita(idPreferito).subscribe(
          (ok) => {
            this.isInserzionePreferita = true;
          },
          (err) => {
            this.showAddPreferitoError();
          }
        );
      },
      (err) => {
        this.showRecuperaPreferitiError();
      }
    );
    } else {
      this.navCtrl.push(LOGIN_PAGE);
    }
  }
}

@Component({
selector: 'page-modal',
template: 
`
<style>
textarea{
  height: calc(20vh - 10px) !important;
  overflow: auto !important;
  margin: 5px !important;
}
</style>
<ion-card style="margin: 0; margin-right: 0; box-shadow: none; background: rgb(255, 234, 195); width: 100%;">
  <ion-card-header>
    <ion-card-title style="font-size: 20px; font-weight: bold;">Contatta l'inserzionista</ion-card-title>
    <ion-textarea style="height: 20vh; border: 1px dotted orange;" [(ngModel)]="messaggio">Ciao, ti contatto..</ion-textarea>
  </ion-card-header>
  <ion-card-content text-center>
    <button ion-button (click)="invia()">Invia</button>
  </ion-card-content>
</ion-card>
`
})
export class NewMessageModal {
messaggio : string;
constructor(public navCtrl: NavController, public viewCtrl : ViewController ,public navParams: NavParams, public events : Events) {
  this.messaggio = "Ciao, ti contatto per l'inserzione \""+navParams.get("titolo")+"\"";
}
public closeModal(){
    this.viewCtrl.dismiss();
}

invia(){
  this.events.publish("invia-messaggio", this.messaggio);
  this.closeModal();
}

} 
