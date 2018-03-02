import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  // expor itens API
  items:CategoriaDTO[];
  bucketUrl:String = API_CONFIG.bucketBaseUrl;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriaService) { // Injetar serviço findAll de CategoriaService
  }

  ionViewDidLoad() {
    // . subscribe -> Função executada enquanto espera resposta
    // Como parâmetro pode executar um método (Ex. this.nomeMetodo())
      // Ou criar um função diretamente response => {.... }
    // Pode criar um função de erro  , erro => { .... }
    this.categoriaService.findAll()
      .subscribe(response => {
          this.items = response; // Pega os dados da requisição
          // console.log(response); Ver log no Chrome
      },
      error => {
        
      });

  }


}
