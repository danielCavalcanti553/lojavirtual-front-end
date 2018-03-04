import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  }

  
  // IONIC Life Cycle
  constructor(
    public navCtrl: NavController, 
    public menu: MenuController, // Desabilitando Menu Lateral, injetar menuController
    public auth: AuthService // Injetando Autenticação
    ) {

  }

  // Desabilitar menu lateral quando entrar no login

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  // Habilitar menu lateral quando sair da tela de login (ao realizar o login)
  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

  login(){

    //Autenticando
    this.auth.authenticate(this.creds)
      .subscribe(response => {
          //console.log(response.headers.get('Authorization')); // imprimindo header
          this.auth.sucessfulLogin(response.headers.get('Authorization'));
          this.auth.perfil();
          this.navCtrl.setRoot('CategoriasPage'); // Indo para categorias


      },
    error => {});    
  }

  // Refresh Token
  ionViewDidEnter(){
    this.auth.refreshToken()
      .subscribe(response => {
          //console.log(response.headers.get('Authorization')); // imprimindo header
          this.auth.sucessfulLogin(response.headers.get('Authorization'));
          this.navCtrl.setRoot('CategoriasPage'); // Indo para categorias
      },
    error => {}); 
  }

  // navegar para página signup
  signup(){
    this.navCtrl.push('SignupPage');
  }

}
