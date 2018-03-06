import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HistoricoService } from '../../services/domain/historico.service';
import { HistoricoDTO } from '../../models/historico.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-historico',
  templateUrl: 'historico.html',
})
export class HistoricoPage {
  items: HistoricoDTO[] = [];
  page : number = 0;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public historico : HistoricoService,
    public produtoService : ProdutoService) {
  }

  ionViewDidLoad() {
    this.loadData();

  }

  loadData(){
    this.historico.findAll(this.page, 10)
    .subscribe(response => {
      let start = this.items.length;
      this.items = this.items.concat(response['content']);//this.items.concat(response['content']);
      let end = this.items.length - 1;

      console.log(this.page);
      console.log(this.items);
      
      this.loadImageUrls(start, end);
    })
  }


  loadImageUrls(start: number, end: number) { //
    // Carregando imagens para todos os produtos em items
    for (var i = start; i <= end; i++)  { 
        let item = this.items[i];
        this.produtoService.getSmallImageFromBucket(item.produtoId)
          .subscribe(response => {
            item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produtoId}-small.jpg`;
          },
          error => { });
      }
    
    
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
