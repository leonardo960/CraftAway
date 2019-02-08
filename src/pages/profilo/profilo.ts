import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events, AlertController, PopoverController } from 'ionic-angular';
import { UtenteService } from "../../services/utente.service";
import { Utente } from '../../model/utente';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
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

  constructor(public navCtrl: NavController, public popCtrl: PopoverController, public navParams: NavParams, public utenteService: UtenteService, public events : Events, public translateService : TranslateService, public storage : Storage, public alertController : AlertController) {
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

  logout(){
    this.utenteService.logout();
    this.navCtrl.popToRoot();
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
      },
      (err) => {
        this.showModifyProfiloError();
      }
    );
  }

  showModifyProfiloError(){
    this.alertController.create({
      title: "Oh no!",
      message: "Si è verificato un errore nella modifica dei dati del profilo. Riprova più tardi!",
      buttons : [{
        text: "Capito"
      }]
    }).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfiloPage');
  }

}

