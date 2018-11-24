import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItensService } from '../../services/domain/itens.service';
import { ItensDTO } from '../../models/intens.rest';
import { RestauranteDTO } from '../../models/restaurantes.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { ClienteDTO } from '../../models/clientes.dto';
import { PedidosDTO } from '../../models/pedidos';

@IonicPage()
@Component({
  selector: 'page-itens-rest',
  templateUrl: 'itens-rest.html',
})
export class ItensRestPage {
  rest: RestauranteDTO;
  itens: ItensDTO[];
  cliente: ClienteDTO[];
  idpedido: string;
  user:string;
  pedido: PedidosDTO;
  valorpedido:string;
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public itensService: ItensService,
    public clienteService: ClienteService) {
      this.valorpedido = "0.00";
    
    this.rest = navParams.get('rest');
    this.cliente = navParams.get('cliente');
  }

  ionViewDidLoad() {
    this.user = localStorage.getItem("userName");
    this.itensService.findAll(this.rest.idRestaurante).subscribe(response => {
      this.itens = response;
    },
    error => {
      console.log(error);
    });
    
  }

  ionViewCanEnter(){
    console.log("in ionViewCanEnter");
    return new Promise((resolve, reject) => { 
      console.log("in ionViewCanEnter dentro da promise");
      
      if(localStorage.getItem("numeroPedido") == "0"){
        if (this.navParams.get('fail')) {
          reject(true)
        } else {
          this.itensService.criaPedido(this.cliente[0].idt_id_cliente, this.rest.idRestaurante)
          .subscribe(response => {
            localStorage.setItem("numeroPedido", response[0].idPedido); 
            this.pedido = response[0];
            resolve(response);
          },error =>{
  
        });
        }
      }else if(localStorage.getItem("numeroPedido") == this.pedido.idPedido){
        console.log("ta no retorno do pedido");
        this.itensService.retornaPedido()
        .subscribe(response => { 
          console.log(response);
          this.pedido = response[0];
          resolve(response);
        },error =>{

      });
      }else{
        resolve(true);
      }
    });
  }

  ionViewDidEnter(){
    console.log("ionViewDidEnter itens-rest");
    console.log(this.pedido.valorTotal);
    
    if(this.pedido.valorTotal == null){
      this.valorpedido = "0.00";
    }else{
      this.valorpedido = this.pedido.valorTotal;
    }
  }

  retornaCliente(){
    this.clienteService.retornaCliente().subscribe(response => {
      this.cliente = response;
    },
    error => {
    }
    );
  }


  goToItem(item: ItensDTO){
    this.navCtrl.push('ItemPage',{
      item: item
    });
  }

  getPedido(){
    this.navCtrl.push('PedidosPage',{
      pedido: this.pedido
    });
  }

}
