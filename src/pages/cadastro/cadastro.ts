import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ClienteCadastro } from '../../models/clientesCadastro.dto.';
import { ClienteService } from '../../services/domain/cliente.service';

/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  cliente: ClienteCadastro = {
    nme_primeiro_nome: "", 
    nme_ultimo_nome: "",
    cpf_cliente: "",
    eml_email: "",
    cel_celular: "",
    pwd_senha: "",
    ddd_ddd: "",
    url_foto_cliente: "", 
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public clienteService: ClienteService,  public alerCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  finalizaCadastro(){
    this.clienteService.cadastraCliente(this.cliente).subscribe(response => {
      if(response){
        this.doAlert();
      }
    }, error => {

    });
  }

  doAlert(){

    let alert = this.alerCtrl.create({

      title: 'Cadastro Realizado',

      message: 'Realizar Login',

      buttons: ['Ok']

    });

    alert.present()

  }

}
