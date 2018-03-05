import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriaService } from '../services/domain/categoria.service';
import { AuthService } from '../services/auth.service';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { StorageService } from '../services/storage.service';
import { ClienteService } from '../services/domain/cliente.service';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { ProdutoService } from '../services/domain/produto.service';
import { CarrinhoService } from '../services/domain/carrinho.service';
import { CacheModule } from 'ionic-cache';
import { ImageUtilService } from '../services/image-util.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Funcionar requisções HTTP para todas as páginas
    IonicModule.forRoot(MyApp),
    CacheModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
// Providers -> Qual escopo será instanciado o serviço
// Onde devo instanciar o serviço? Caso seja no app.module.ts será uma única instância para toda a aplicação
      // Caso seja registrado no module da página, terá a instância somente para ela
// Próximo passo, injetar em Categorias Page
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriaService,
    AuthInterceptorProvider, // Deverá vir antes do erro (ErrorInterceptorProvider)
    ErrorInterceptorProvider, // importando tratamento de erro
    AuthService,
    StorageService,
    ClienteService,
    ProdutoService,
    CarrinhoService,
    ImageUtilService
  ]
})
export class AppModule {}