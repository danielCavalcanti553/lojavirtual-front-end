import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // removido '/src/model'
import { ClienteService } from '../../services/domain/cliente.service';
//import { FormBuilder } from '@angular/forms/src/form_builder'; Inserido no Grupo acima


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup : FormGroup;

  // FormGroup: Injetar o formBuider
  constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      public formBuilder : FormBuilder,
      public clienteService: ClienteService,
      public alertCtrl: AlertController) {

        this.formGroup = this.formBuilder.group({
          // Parâmetros: valor inicial, lista de validators (repetir do backend)
         
          cpf : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
          nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
          endereco : ['Rua Via', [Validators.required]],
          municipio : ['Rio de Janeiro', []],
          estado : ['RJ', []],
          telefone : ['977261827', [Validators.required]],
          email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
          senha : ['123', [Validators.required]]
        }); // Responsável por instanciar um FormGroup
  }

  signupUser() {
     //console.log(this.formGroup.value); -> Testar Json no Console do Chrome
     
     this.clienteService.insert(this.formGroup.value)
     .subscribe(reponse => {
       this.showInsertOk();
     },
     error => { }
     );
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false, // clicar somente no botão para sair
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.pop(); // desempilhar a página
          }
        }
      ]
    });

    alert.present();
  }
}
