import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';
import { CameraOptions, Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente : ClienteDTO;
  picture : string;
  cameraOn : boolean = false;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage : StorageService, // injetando Local store
    public clienteService : ClienteService,
  public camera :Camera) { // Injetando cliente Service
  }

  ionViewDidLoad() {
   this.loadData();

  }


loadData(){
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

    // Carregar Camera
    getCameraPicture(){

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG, // ou JPEG
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // grava imagem em base 64
     this.picture = 'data:image/png;base64,' + imageData; // jpeg
     this.cameraOn = false;
    }, (err) => {
     // Handle error
    });
  }


// Carregar Camera
getGaleriaPicture(){

  this.cameraOn = true;

  const options: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.PNG, // ou JPEG
    mediaType: this.camera.MediaType.PICTURE
  }
  
  this.camera.getPicture(options).then((imageData) => {
   // grava imagem em base 64
   this.picture = 'data:image/png;base64,' + imageData; // jpeg
   this.cameraOn = false;
  }, (err) => {
   // Handle error
  });
}



  enviaFoto(){
    this.clienteService.uploadFoto(this.picture)
      .subscribe(response => {
        this.picture= null;
        this.loadData();
      },
    error => {

    });
  }

  cancel(){
    this.picture = null;
  }
}
