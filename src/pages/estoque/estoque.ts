import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoDTO } from '../../models/produto.dto';


@IonicPage()
@Component({
  selector: 'page-estoque',
  templateUrl: 'estoque.html',
})
export class EstoquePage {

  items: ProdutoDTO[] = [];
  page : number = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loading : LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    
    let loader = this.presentLoading();
    this.produtoService.findByEstoque(this.page, 10) //, this.page, this.lines
      .subscribe(response => {
        let start = this.items.length;
        this.items = this.items.concat(response['content']);//this.items.concat(response['content']);
        let end = this.items.length - 1;
        loader.dismiss();
        console.log(this.page);
        console.log(this.items);
        
        this.loadImageUrls(start, end);
        
        //console.log(this.page);
        //console.log(this.items);
        //
      },
      error => {
        loader.dismiss();
      });
  }

  loadImageUrls(start: number, end: number) { //
    // Carregando imagens para todos os produtos em items
    for (var i = start; i <= end; i++)  { 
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.codigoProduto)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.codigoProduto}-small.jpg`;
        },
        error => { });
    }
  }

  showDetail(produt_id : string){
    
  }

  presentLoading() {
    let loader = this.loading.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  doInfinite(infiniteScroll) {
    this.page ++;
    this.loadData();
    setTimeout(() => {
      
      infiniteScroll.complete();
    }, 1000);
  }
}
