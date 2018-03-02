import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');
    //let loader = this.presentLoadingDefault();
    this.produtoService.findByCategoria(categoria_id) //, this.page, this.lines
      .subscribe(response => {
        //let start = this.items.length;
        this.items = response['content']//this.items.concat(response['content']);
        this.loadImageUrls();
        //let end = this.items.length - 1;
        //loader.dismiss();
        //console.log(this.page);
        //console.log(this.items);
        //this.loadImageUrls(start, end);
      },
      error => {
        //loader.dismiss();
      });

  }

  loadImageUrls() { //start: number, end: number
    // Carregando imagens para todos os produtos em items
    for (var i = 0; i < this.items.length; i++) { // for (var i = start; i <= end; i++) 
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.codigoProduto)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.codigoProduto}-small.jpg`;
        },
        error => { });
    }
  }

}
