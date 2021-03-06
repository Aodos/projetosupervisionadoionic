import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestaranteService } from '../../services/domain/categoria.service';
import { RestauranteDTO } from '../../models/restaurantes.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { ClienteDTO } from '../../models/clientes.dto';
import { ItensService } from '../../services/domain/itens.service';

/**
 * Generated class for the PrincipalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {

  restaurantes: RestauranteDTO[];
  cliente: ClienteDTO[];
  user:string;
  imgCliente:string;
  coords: Coordinates;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public restService: RestaranteService,
    public clienteService: ClienteService,
    public itensService: ItensService,
    public loadingCtrl: LoadingController) {


  }



  ionViewDidLoad() {
    this.restService.findNear(localStorage.getItem("lat"),localStorage.getItem("lng")).subscribe(response => {
      this.restaurantes = response;
    },
    error => {
    }); 

    this.user = localStorage.getItem("userName");
    this.imgCliente = localStorage.getItem("userIMG");
    localStorage.setItem("numeroPedido", "0");
  }

  ionViewDidEnter(){
    this.itensService.limpaPedido().subscribe(response => {
      console.log(response);
    },
    error => {

    }); 
    localStorage.setItem("numeroPedido", "0");
  }

  ionViewCanEnter(){
    return new Promise((resolve, reject) => { 
      if (this.navParams.get('fail')) {
        reject(true)
      } else {
      this.clienteService.retornaCliente().subscribe(response => {
        this.cliente = response;
        resolve(response);
        localStorage.setItem("userName", this.cliente[0].nme_primeiro_nome);
        localStorage.setItem("userIMG", this.cliente[0].url_foto_cliente);
        localStorage.setItem("idUserName", this.cliente[0].idt_id_cliente);
      },
      error => {
        reject(error)
      }
      );}
    });
  }


  goToItensRest(rest: RestauranteDTO){
    this.navCtrl.push('ItensRestPage',{
      rest: rest,
      cliente: this.cliente
    });
  }

  getItems(ev: any){
    console.log(ev.target.value);
  }

  goToVerPedidos(){
    this.navCtrl.push('ListapedidosPage');
  }


}
