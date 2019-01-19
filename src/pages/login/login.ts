import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SIGNUP_PAGE, HOME_PAGE } from '../pages';
import { UtenteService } from '../../services/utente.service';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public utenteService : UtenteService) {

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

  login() : void {
    this.utenteService.login(this.email, this.password).subscribe(
      (response) => {
        this.utenteService.setActiveToken(response.headers.get("token"));
        this.utenteService.setUtenteLoggato(response.body);
        this.navCtrl.pop();
      },
      (err) => {
        //error handling
        console.log(JSON.stringify(err));
      }
    );
  }

  goToSignup() : void {
    this.navCtrl.push(SIGNUP_PAGE);
  }

}
