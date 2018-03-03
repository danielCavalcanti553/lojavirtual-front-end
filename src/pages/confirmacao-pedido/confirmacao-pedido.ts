import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteService } from '../../services/domain/cliente.service';
import { CarrinhoService } from '../../services/domain/carrinho.service';
import { PedidoDTO } from '../../models/pedido.dto';
import { Item } from '../../models/item';
import { ClienteDTO } from '../../models/cliente.dto';
import { PedidoService } from '../../services/domain/pedido.service';


@IonicPage()
@Component({
  selector: 'page-confirmacao-pedido',
  templateUrl: 'confirmacao-pedido.html',
})
export class ConfirmacaoPedidoPage {

  pedido : PedidoDTO;
  carItens : Item[];
  cliente : ClienteDTO;
  codigoNew :  string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public clienteService: ClienteService,
    public carService: CarrinhoService,
    public pedidoService : PedidoService
    ) {

    this.pedido = this.navParams.get('pedido');
    
  }

  ionViewDidLoad() {
    this.carItens = this.carService.getCarrinho().items;
    this.clienteService.findById(this.pedido.cliente.codigoCliente)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;
      
      },
    error => {
      this.navCtrl.setRoot('HomePage');
    });
  }

  total(){
    this.carService.total();
  }

  checkout(){
    this.pedidoService.inserir(this.pedido)
      .subscribe(response => {
        this.carService.createOrClearCart()
        console.log(response.headers.get('location'))
        this.codigoNew = this.utilExtrairId(response.headers.get('location'))
        console.log(this.codigoNew)
      },
    error => {
      if(error.status == 403){
        this.navCtrl.setRoot('HomePage');
      }
    });
  }

  voltar(){
    this.navCtrl.setRoot('CarrinhoPage');
  }

  private utilExtrairId(location : string) : string{
    let position = location.lastIndexOf('/');
    return location.substring(position+1,location.length);
  }

}
