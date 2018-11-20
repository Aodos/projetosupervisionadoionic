import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaranteService } from '../../services/domain/categoria.service';
import { RestauranteDTO } from '../../models/restaurantes.dto';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public restService: RestaranteService) {

  }

  ionViewDidLoad() {
    this.restService.findAll().subscribe(response => {
      this.restaurantes = response;
    },
    error => {
    });   
  }

  goToItensRest(rest: RestauranteDTO){
    this.navCtrl.push('ItensRestPage',{
      rest: rest
    });
  }

  getItems(ev: any){
    console.log(ev.target.value);
  }

}
