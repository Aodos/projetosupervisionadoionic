import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItensDTO } from '../../models/intens.rest';
import { ItensService } from '../../services/domain/itens.service';

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
  user:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public itemService: ItensService) {
    this.item = this.navParams.get('item');
    this.qntpedido = 1;
    this.precoatual = parseFloat(this.item.vlr_valor_item);
    this.precoitem = parseFloat(this.item.vlr_valor_item);
  }

  ionViewDidLoad() {
    this.user = localStorage.getItem("userName");
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

  adicionaItem(){
    let id = this.item.idt_id_item;
    let qnt = this.qntpedido.toString()
    this.itemService.addItem(id, qnt).subscribe(
      response => {
        console.log(response);
      }
    );

    setTimeout( () => {
      this.navCtrl.pop();
 }, 2000);
    
  }
}
