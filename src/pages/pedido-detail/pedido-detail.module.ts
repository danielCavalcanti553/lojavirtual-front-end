import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidoDetailPage } from './pedido-detail';

@NgModule({
  declarations: [
    PedidoDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidoDetailPage),
  ],
})
export class PedidoDetailPageModule {}
