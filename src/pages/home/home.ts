import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  coords: any;
  constructor(public navCtrl: NavController,
              ) {

  }

  goToLogin(){
    this.navCtrl.setRoot('LoginPage',{
      coords: this.coords
    })
  }

  goToCadastro(){
    this.navCtrl.push('CadastroPage');
  }
}
