import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SIGNUP_PAGE, HOME_PAGE } from '../pages';
import { UtenteService } from '../../services/utente.service';
import { HttpResponse } from '@angular/common/http';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  shouldShowPassword : boolean = true;
  email : string;
  password : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public utenteService : UtenteService, public alertController : AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  showHidePassword() : void {
    this.shouldShowPassword = !this.shouldShowPassword;
  }

  forgotPassword() : void {
    console.log("Password dimenticata!");
  }

  login() {
    this.utenteService.login(this.email, this.password).subscribe(
      (response : HttpResponse<any>) => {
        if(response.status == 200){
          this.utenteService.setActiveToken(response.headers.get("token"));
          this.utenteService.setUtenteLoggato(response.body);
          this.navCtrl.pop();
        } else if(response.status == 401){
          this.showLoginError();
        } else {
          this.showLoginServerError();
        }
      }
    );
  }

  showLoginError(){
    this.alertController.create({
      title: "Credenziali errate",
      message: "Sembra che email o password siano errati. Riprova!",
      buttons : ["Capito"]
    }).present();
  }

  showLoginServerError(){
    this.alertController.create({
      title: "Oh no!",
      message: "Non è stato possibile effettuare il login per un errore nel server. Riprova più tardi!",
      buttons : ["Capito"]
    }).present();
  }

  goToSignup() : void {
    this.navCtrl.push(SIGNUP_PAGE);
  }

}
