import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";
import { JwtHelper } from "angular2-jwt";
import { CarrinhoService } from "./domain/carrinho.service";

@Injectable()
export class AuthService{ J

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(
        public http: HttpClient, 
        public storage : StorageService,
        public carrinhoService : CarrinhoService){ // Injetado StorageService
    }

    authenticate(creds : CredenciaisDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            creds,
            {
                observe:'response', // pegar o header da resposta
                responseType: 'text' // evitar erro parseJSON em retorno vazio  
            }
        );
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

    logout(){
        this.storage.setLocalUser(null);
    }
}