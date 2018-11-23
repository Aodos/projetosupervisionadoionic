import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    let teste: string = "http://localhost:8080/pedidos/14";
    //teste = teste.replace('/',':');
    console.log(teste.split('/'));
  }

  goToLogin(){
    this.navCtrl.setRoot('LoginPage')

  }

}
