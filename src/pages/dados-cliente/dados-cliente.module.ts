import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DadosClientePage } from './dados-cliente';

@NgModule({
  declarations: [
    DadosClientePage,
  ],
  imports: [
    IonicPageModule.forChild(DadosClientePage),
  ],
})
export class DadosClientePageModule {}
