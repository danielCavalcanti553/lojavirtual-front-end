import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';
import { StorageService } from '../../services/storage.service';
import { MyApp } from '../../app/app.component';
import { AuthService } from '../../services/auth.service';



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
    public categoriaService: CategoriaService,
    public storage : StorageService,
    public app : MyApp,
    public auth :AuthService
  ) { // Injetar serviço findAll de CategoriaService
    }

  ionViewDidLoad() {
    // . subscribe -> Função executada enquanto espera resposta
    // Como parâmetro pode executar um método (Ex. this.nomeMetodo())
      // Ou criar um função diretamente response => {.... }
    // Pode criar um função de erro  , erro => { .... }

    // Adicionando perfil para menu
    let perfil :Array<{ title: string, component: string }> = [];
    this.auth.findByEmailToMenu(this.storage.getLocalUser().email)
        .subscribe(response => {
            perfil = response['perfis'];
            if(perfil.length >1){
               
                this.app.pages = this.auth.perfilAdmin();
            }else{

              this.app.pages = this.auth.perfilCliente();
            }
    });

    

    this.categoriaService.findAll()
      .subscribe(response => {
          this.items = response; // Pega os dados da requisição
          // console.log(response); Ver log no Chrome
      },
      error => {

      });

  }

  showProdutos(categoria_id:string){
    this.navCtrl.push('ProdutosPage', {categoria_id : categoria_id});
  }


}
