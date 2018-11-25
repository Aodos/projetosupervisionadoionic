import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';
import { AlertController } from 'ionic-angular';
import { Geolocation } from '../../../node_modules/@ionic-native/geolocation';

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

  credencial: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  coords: Coordinates;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthService,
    public alerCtrl: AlertController,
    public geo: Geolocation,
    public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    let opt : {
      enableHighAccuracy: true
    }
    let watch = this.geo.watchPosition(opt);
    watch.subscribe(resp => {
      this.coords = resp.coords;
    });
  }

  goToHomePage(){
    this.navCtrl.push('HomePage')
    
  }

  goToPrincipal(email: string){  
    this.auth.autheticate(this.credencial)
      .subscribe(response => {
        console.log("Passando aqui");
        this.auth.successfulLogin(response.headers.get('Authorization'));
        localStorage.setItem("emailLogado",email);
        localStorage.setItem("lat",this.coords.latitude.toFixed(7));
        localStorage.setItem("lng",this.coords.longitude.toFixed(7));
        this.navCtrl.setRoot('PrincipalPage',{
          email: email,
        }); 
      },
      error => {
        this.doAlert();
      })
    
      
  }

  doAlert() {

    let alert = this.alerCtrl.create({

      title: 'Login inválido',

      message: 'Crendenciais usadas não são válidas, tente novamente',

      buttons: ['Ok']

    });

    alert.present()

  }

}
