import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";
import { JwtHelper } from "angular2-jwt";
import { CarrinhoService } from "./domain/carrinho.service";


@Injectable()
export class AuthService{ 

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(
        public http: HttpClient, 
        public storage : StorageService,
        public carrinhoService : CarrinhoService){ // Injetado StorageService
    }

    authenticate(creds : CredenciaisDTO){
        this.storage.setMenu(null);
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            creds,
            {
                observe:'response', // pegar o header da resposta
                responseType: 'text' // evitar erro parseJSON em retorno vazio  
            }
        );
    }

    findByEmailToMenu(email:string){
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    refreshToken(){ // token incluido automaticamente na requisição
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`,
            {},
            {
                observe:'response', // pegar o header da resposta
                responseType: 'text' // evitar erro parseJSON em retorno vazio  
            }
        );
    }

    // Quando um login tem sucesso
    sucessfulLogin(authorizationValue : string){ // Recebe com argumento o token
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
        this.carrinhoService.createOrClearCart();
    }

    perfil(){        
        
    }

    logout(){
       
        
        this.storage.setMenu(null);
        this.storage.setLocalUser(null);
    }

    perfilCliente() : Array<{ title: string, component: string }>{

        return [
          { title: 'Profile', component: 'ProfilePage' },
          { title: 'Meus Dados', component: 'DadosClientePage' },
          { title: 'Categorias', component: 'CategoriasPage' },
          { title: 'Pedidos', component: 'PedidoPage' },
          { title: 'Carrinho', component: 'CarrinhoPage' },
          { title: 'Logout', component: ''}
        ];
  
    }
  
    perfilAdmin() : Array<{ title: string, component: string }>{
  
        return [
          { title: 'Profile', component: 'ProfilePage' },
          { title: 'Meus Dados', component: 'DadosClientePage' },
          { title: 'Categorias', component: 'CategoriasPage' },
          { title: 'Pedidos', component: 'PedidoPage' },
          { title: 'Carrinho', component: 'CarrinhoPage' },
          { title: 'Histórico', component: 'HistoricoPage'},
          { title: 'Estoque', component: 'EstoquePage'},
          { title: 'Logout', component: ''}
        ];
      }
}