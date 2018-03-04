import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente : ClienteDTO;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage : StorageService, // injetando Local store
    public clienteService : ClienteService) { // Injetando cliente Service
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser(); // pegando o localUser
    if(localStorage && localUser.email){ // Se existir localStore e nela existir email
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          // resposta com sucesso
          this.cliente = response as ClienteDTO;
          this.getImagePerfil();
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

  }

  getImagePerfil(){
    this.clienteService.getImageFromS3(this.cliente.codigoCliente)
      .subscribe(response => {
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.codigoCliente}.jpg`;
      },
      error => {});
    }

}
