import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ItemNoPedidoDTO } from '../../models/itens.ja.pedidos';
import { PedidosDTO } from '../../models/pedidos';
import { ItensService } from '../../services/domain/itens.service';


@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class PedidosPage {
  pedido: PedidosDTO;
  itensDoPedido: ItemNoPedidoDTO[];
  valortotalpedido: number = 0;
  valorMulti:number = 0;
  user: string;
  imgCliente: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alerCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public itensService: ItensService) {
    this.pedido = this.navParams.get('pedido');
    this.itensDoPedido = this.pedido.itensPedido;
  }

  ionViewDidLoad() {
     
    this.itensDoPedido.forEach((value) => {
      let vlr = Number(value.valorItem) * Number(value.qntItem);
      this.valortotalpedido = Number(this.valortotalpedido) + vlr;
    })
    
    this.imgCliente = localStorage.getItem("userIMG");
  }

  ionViewDidEnter(){
    this.user = localStorage.getItem("userName");
  }

  multiplicaValor(a:string, b:string):number{
    this.valorMulti = Number(a) * Number(b);
    return this.valorMulti;
  }

  finalizaPagamento(){
    this.presentLoading();
    setTimeout(() => {
      this.doAlert();
    }, 5000);
  }

  doAlert() {

    let alert = this.alerCtrl.create({

      title: 'Status Pagamento',

      message: 'Pagamento realizado com sucesso',

      buttons: [{
        text: 'OK!',
        handler: () => {
          this.navCtrl.push('PrincipalPage');
        }
      }]

    });

    alert.present()


  }

  presentLoading() {
    this.itensService.finalizaPgto().subscribe(response => {
      console.log(response);
    },error => {

    });


    const loader = this.loadingCtrl.create({
      content: "Finalizando Pagamento",
      duration: 4000
    });
    loader.present();
  }

}
