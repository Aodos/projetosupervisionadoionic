import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GerenciarestaurantePage } from './gerenciarestaurante';

@NgModule({
  declarations: [
    GerenciarestaurantePage,
  ],
  imports: [
    IonicPageModule.forChild(GerenciarestaurantePage),
  ],
})
export class GerenciarestaurantePageModule {}
