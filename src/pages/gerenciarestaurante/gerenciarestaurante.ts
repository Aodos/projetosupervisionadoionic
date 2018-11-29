import { Component,  } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ItensService } from '../../services/domain/itens.service';
import { RestauranteDTO } from '../../models/restaurantes.dto';

/**
 * Generated class for the GerenciarestaurantePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gerenciarestaurante',
  templateUrl: 'gerenciarestaurante.html',
})
export class GerenciarestaurantePage {

  login:boolean = true;
  cadastro:boolean = true;
  loginpage:boolean = false;
  cadastroPage:boolean = false;
  bodyCadast: RestauranteDTO = {
    idRestaurante: "",
    cep: "",
    cidade: "",
    cnpjRestaurante: "",
    endereco: "",
    latitude: "",
    longitude: "",
    nomeRestaurante: "",
    senhaRestaurante: "",
    url_foto_restaurante: "",
    distance: ""
};

 idRest: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public itensService: ItensService,public alerCtrl: AlertController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GerenciarestaurantePage');
  }



  goToLogin(){
    this.login = !this.login;
    this.loginpage = !this.loginpage;
    this.cadastro = !this.cadastro;
  }

  goToCadastro(){
    this.login = !this.login;
    this.cadastroPage = !this.cadastroPage;
    this.cadastro = !this.cadastro;
  }

  realizaLogin(id:string, senha:string){
    this.itensService.retornaRestaurante(id).subscribe(response=>{
      if(response.body[0].idRestaurante == id && response.body[0].senhaRestaurante == senha){
        localStorage.setItem("restLogado", response.body[0].idRestaurante);
        this.navCtrl.setRoot('GerenciarestauranteloginPage');
      }else{
        this.doAlert2();
      }
    });
  }

  voltaDoLogin(){
    this.login = !this.login;
    this.loginpage = !this.loginpage;
    this.cadastro = !this.cadastro;
  }

  realizaCadastro(){
    
    this.itensService.cadastraRest(this.bodyCadast).subscribe(response=>{
      console.log(response.headers.get('Location').split('/')[4]);
      localStorage.setItem("restCadastrado", response.headers.get('Location').split('/')[4]) ;
      console.log(response.headers.get('Location').split('/')[4]);
    });

    this.presentLoading();
    

    setTimeout( () => {
      this.doAlert();
      this.voltaDoCadastro();
 }, 4000);
    

  }

  voltaDoCadastro(){
    this.login = !this.login;
    this.cadastroPage = !this.cadastroPage;
    this.cadastro = !this.cadastro;
  }


  doAlert() {

    let alert = this.alerCtrl.create({

      title: 'Restaurante cadastrado',

      message: 'Seu id para login é: ' + localStorage.getItem("restCadastrado"),

      buttons: ['Ok']

    });

    alert.present()

  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Realizando Cadastro...",
      duration: 4000
    });
    loader.present();
  }

  doAlert2() {

    let alert = this.alerCtrl.create({

      title: 'Credenciais erradas',


      buttons: ['Ok']

    });

    alert.present()

  }

}
