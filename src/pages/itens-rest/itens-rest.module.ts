import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItensRestPage } from './itens-rest';

@NgModule({
  declarations: [
    ItensRestPage,
  ],
  imports: [
    IonicPageModule.forChild(ItensRestPage),
  ],
})
export class ItensRestPageModule {}
