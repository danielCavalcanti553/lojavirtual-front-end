import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { CarrinhoService } from '../../services/domain/carrinho.service';


@IonicPage()
@Component({
  selector: 'page-pagamento',
  templateUrl: 'pagamento.html',
})
export class PagamentoPage {
  

  pedido: PedidoDTO;
  formGroup : FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuider: FormBuilder,
    public storage : StorageService,
    public clienteService : ClienteService,
    public carrinhoService : CarrinhoService) {

      this.pedido = this.navParams.get('pedido');
      this.formGroup = this.formBuider.group({

        numeroCartao :  ['1234567890123456', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],

      });
  }


  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser(); // pegando o localUser
    if(localStorage && localUser.email){ // Se existir localStore e nela existir email
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          // resposta com sucesso

          let carrinho = this.carrinhoService.getCarrinho();

          this.pedido = {
            cliente: {codigoCliente : response['id']},
            pagamento : null,
            itens : carrinho.items.map(x=>{return {quantidade:x.quantidade , produto: {codigoProduto:x.produto.codigoProduto}}})
          }
        },
      error => {

        if(error.status == 403){
          // Houve um erro, redirecionando para HomePage
          this.navCtrl.setRoot('HomePage');
        }

      });
      
    }else{
      // Houve um erro no localStoraou localUser, redirecionando para HomePage
      this.navCtrl.setRoot('HomePage');
    }

    console.log('ionViewDidLoad ProfilePage');
  }

  proximo(){
    console.log(this.pedido);
  }

}
