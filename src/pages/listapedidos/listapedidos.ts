import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItensService } from '../../services/domain/itens.service';
import { PedidosDTO } from '../../models/pedidos';


@IonicPage()
@Component({
  selector: 'page-listapedidos',
  templateUrl: 'listapedidos.html',
})
export class ListapedidosPage {
  user:string;
  pedidos: PedidosDTO[];
  imgCliente: string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public itensService: ItensService) {
  }

  ionViewDidLoad() {
    this.user = localStorage.getItem("userName");
    this.imgCliente = localStorage.getItem("userIMG");

    this.itensService.retornaTodosPedidos().subscribe(response => {
      this.pedidos = response;
      console.log(response);
    },error => {

    });

  }


}
