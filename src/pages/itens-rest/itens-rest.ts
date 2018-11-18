import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItensService } from '../../services/domain/itens.service';
import { ItensDTO } from '../../models/intens.rest';
import { RestauranteDTO } from '../../models/restaurantes.dto';

/**
 * Generated class for the ItensRestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-itens-rest',
  templateUrl: 'itens-rest.html',
})
export class ItensRestPage {
  rest: RestauranteDTO;
  itens: ItensDTO[];
  imgRest: string;

  idpedido: string;
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public itensService: ItensService) {

    this.rest = navParams.get('rest');
  }

  ionViewDidLoad() {
    this.imgRest = "../../assets/imgs/McDn.png";
    this.itensService.findAll(this.rest.idRestaurante).subscribe(response => {
      this.itens = response;
    },
    error => {
      console.log(error);
    });
  }

  goToItem(item: ItensDTO){
    this.navCtrl.push('ItemPage',{
      item: item
    });
  }



}
