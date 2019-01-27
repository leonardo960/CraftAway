import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events, AlertController, PopoverController } from 'ionic-angular';
import { UtenteService } from "../../services/utente.service";
import { Utente } from '../../model/utente';

@IonicPage()
@Component({
  selector: 'page-profilo',
  templateUrl: 'profilo.html',
})
export class ProfiloPage {

  utente: Utente;
  nomeUtente: string;
  password: string;
  email: string;
  notModifying: boolean;
  showingIcon: string;
  passInputType: string;

  constructor(public navCtrl: NavController, public popCtrl: PopoverController, public navParams: NavParams, public utenteService: UtenteService) {
    this.utente = this.utenteService.getUtenteLoggato();
    this.nomeUtente = this.utente.nome;
    this.email = this.utente.email;
    this.password = this.utente.password;
    this.notModifying = true;
    this.showingIcon = "eye";
    this.passInputType = "password";
  }

  modifyInformations(){
    this.notModifying = false;
  }

  showPassword(){
    if(this.passInputType == "password"){
      this.passInputType = "text";
      this.showingIcon = "eye-off"
    }else{
      this.passInputType = "password";
      this.showingIcon = "eye"
    }
  }

  updateInformations(){
    this.utente.nome = this.nomeUtente;
    this.utente.password = this.password;
  }

  saveChanges(){
    this.updateInformations();
    this.utenteService.modifyProfile(this.utente).subscribe(
      (ok) => {
        this.navCtrl.pop();
      }
    );
  }

  showLanguagePopup(myEvent){
    let popover = this.popCtrl.create(LangMenu);
    popover.present({
      ev: myEvent
    });
  }

  changeLanguage(){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfiloPage');
  }

}

@Component({
  template: 
  `
    
      <button ion-item (click)="close()">Italiano</button>
      <button ion-item (click)="close()">Inglese</button>
    
  `
})

export class LangMenu {
  constructor(public viewCtrl: ViewController, public events: Events, public alertCtrl: AlertController) {}

  close() {
    this.viewCtrl.dismiss();
  }
}
