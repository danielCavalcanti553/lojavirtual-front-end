import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-dados-cliente',
  templateUrl: 'dados-cliente.html',
})
export class DadosClientePage {

  formGroup: FormGroup;
  idcliente : string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder,
    public clienteService : ClienteService,
    public storage: StorageService,
    public alertCtrl: AlertController,
    public loading: LoadingController) {

    this.formGroupInit("","","","","","","");

  }

  atualizaDados(){
    let loader = this.presentLoading();
    this.clienteService.update(this.formGroup.value,this.idcliente)
    .subscribe(response =>{
      loader.dismiss();
      this.showAlert('Dados cadastrados com sucesso!');
    }, error => {
      loader.dismiss();
      this.showAlert('Erro ao atualizar!');
    })
  }

  ionViewDidLoad() {
    let loader = this.presentLoading();
    this.clienteService.findByEmail(this.storage.getLocalUser().email)
      .subscribe(response => {
        this.idcliente = response['codigoCliente'];
        this.formGroupInit(
          response['cpf'],
          response['nome'],
          response['endereco'],
          response['municipio'],
          response['estado'],
          response['telefone'],
          response['email']
        )
  
        loader.dismiss();
      },error=> {
        loader.dismiss();
      })
    
  }

  formGroupInit(
    cpf : string, nome : string, endereco : string, municipio : string,
     estado : string, telefone : string, email : string ) {

    this.formGroup = this.formBuilder.group({
      // Parâmetros: valor inicial, lista de validators (repetir do backend)
      
      cpf: [cpf, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      nome: [nome, [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      endereco: [endereco, [Validators.required]],
      municipio: [municipio, []],
      estado: [estado, []],
      telefone: [telefone, [Validators.required]],
      email: [email, [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    }); // Responsável por instanciar um FormGroup
  }

  showAlert(msg : string) {
    let alert = this.alertCtrl.create({
      title: 'Mensagem!',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  presentLoading() {
    let loader = this.loading.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }
}
