import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-pedido-detail',
  templateUrl: 'pedido-detail.html',
})
export class PedidoDetailPage {
  pedido : PedidoDTO;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService : ProdutoService) {

    this.pedido = this.navParams.get('pedido');
    
  }

  ionViewDidLoad() {
    console.log(this.pedido);
    this.loadImageUrls();
  }


  loadImageUrls() { //
    // Carregando imagens para todos os produtos em items
    for (var i = 0; i < this.pedido.itens.length; i++)  { 
      

      let item = this.pedido.itens[i];

      this.produtoService.getSmallImageFromBucket(item.produto.codigoProduto)
        .subscribe(response => {
          console.log(`${API_CONFIG.bucketBaseUrl}/prod${item.produto.codigoProduto}-small.jpg`);
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.codigoProduto}-small.jpg`;
        },
        error => { });
    }  }
}

