import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { Item } from '../../models/item';
import { CarrinhoService } from '../../services/domain/carrinho.service';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {

  items: Item[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public carrinhoService : CarrinhoService,
    public produtoService : ProdutoService) {
  }

  ionViewDidLoad() {
    let carrinho = this.carrinhoService.getCarrinho();
    this.items = carrinho.items;
    this.carregarImgUrls();
  }

  carregarImgUrls() {
    // Carregando imagens para todos os produtos em items
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.codigoProduto)
        .subscribe(response => {
          item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.codigoProduto}-small.jpg`;
        },
        error => { }
        )
    }
  }
 
  removeItem(produto : ProdutoDTO){
    this.items = this.carrinhoService.removeProduto(produto).items;
  }

  incrementItem(produto : ProdutoDTO){
    this.items = this.carrinhoService.incrementItem(produto).items;
  }

  decrementItem(produto : ProdutoDTO){
    this.items = this.carrinhoService.decrementItem(produto).items;
  }

  total() : number{
    return this.carrinhoService.total();
  }

  continue(){
    this.navCtrl.setRoot('CategoriasPage');
  }

  checkout(){
    this.navCtrl.push('PagamentoPage');
  }


}
