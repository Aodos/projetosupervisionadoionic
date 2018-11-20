import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItensDTO } from '../../models/intens.rest';

@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {
  item:ItensDTO;
  precoatual: number;
  precoitem: number;
  qntpedido: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get('item');
    this.qntpedido = 1;
    this.precoatual = parseFloat(this.item.vlr_valor_item);
    this.precoitem = parseFloat(this.item.vlr_valor_item);
  }

  ionViewDidLoad() {
    console.log(this.item);
  }

  somanumero(){
    this.qntpedido = this.qntpedido + 1;
    this.precoatual = this.precoitem * this.qntpedido;
  }

  diminuinumero(){
    if (this.qntpedido > 1) {
      this.qntpedido = this.qntpedido - 1;
      this.precoatual = this.precoitem * this.qntpedido;
    } 
  }

}
