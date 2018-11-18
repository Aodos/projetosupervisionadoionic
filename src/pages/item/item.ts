import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItensDTO } from '../../models/intens.rest';

/**
 * Generated class for the ItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {
  item:ItensDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get('item');
  }

  ionViewDidLoad() {
    console.log(this.item);
  }

}
