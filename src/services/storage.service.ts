import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_user";
import { STORAGE_KEYS } from "../config/storage_keys.config";

@Injectable()
export class StorageService{

    // retorna usuário logado
    getLocalUser() : LocalUser{
        let user = localStorage.getItem(STORAGE_KEYS.localUser);// pego o valor no localStore
        
        if(user==null){ // Existe usuário
            return null;
        }else{
            return JSON.parse(user);
        }
    }
    // recebe local user e coloca on store
    setLocalUser(obj : LocalUser){
        if(obj == null ){ // se o objeto for nulo
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }else{ // armazenar no localStorage em formato Text (String)
            localStorage.setItem(STORAGE_KEYS.localUser,JSON.stringify(obj));
        }
    }
}