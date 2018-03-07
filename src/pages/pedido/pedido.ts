import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoService } from '../../services/domain/pedido.service';
import { PedidoDTO } from '../../models/pedido.dto';



@IonicPage()
@Component({
  selector: 'page-pedido',
  templateUrl: 'pedido.html',
})
export class PedidoPage {

  items : PedidoDTO[];


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public pedidoService : PedidoService) {
      
  }

  ionViewDidLoad() {
    this.carregaPedidos();
    
    
  }

  carregaPedidos(){
    this.pedidoService.findByEstoque()
      .subscribe(response => {
        console.log(response['content']);
        this.items = response['content'];
      });
    }



  proximo(p : PedidoDTO){
    
    this.navCtrl.push('PedidoDetailPage', {pedido : p});
  }
}
