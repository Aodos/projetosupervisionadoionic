import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ItensDTO } from '../../models/intens.rest';
import { ItensService } from '../../services/domain/itens.service';

/**
 * Generated class for the GerenciarestauranteloginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gerenciarestaurantelogin',
  templateUrl: 'gerenciarestaurantelogin.html',
})
export class GerenciarestauranteloginPage {
  cadastroItem: boolean = false;
  btcst: boolean = true;
  item: ItensDTO = {
    idt_id_item: "",
    nme_nome_item: "",
    dsc_descricao_item: "",
    vlr_valor_item: "",
    flg_disponibilidade_item: "1",
    url_foto_item: "",
    fk_idt_id_restaurante: localStorage.getItem("restLogado")
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public itensService: ItensService,public alerCtrl: AlertController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GerenciarestauranteloginPage');
  }

  goToCadastro(){
    this.btcst = !this.btcst;
    this.cadastroItem = !this.cadastroItem
  }
  realizaCadastro(){
    this.itensService.cadastraItem(this.item).subscribe(response=>{
      console.log(response);
    });

    this.goToCadastro();
  }
}
