import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_user";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { Carrinho } from "../models/carrinho";

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

    setMenu(obj : Array<{ title: string, component: string }>){
        if(obj == null ){ // se o objeto for nulo
            localStorage.removeItem(STORAGE_KEYS.menus);
        }else{ // armazenar no localStorage em formato Text (String)
            localStorage.setItem(STORAGE_KEYS.menus,JSON.stringify(obj));
        }
    }

    getMenu() : Array<{ title: string, component: string }>{
        let menu = localStorage.getItem(STORAGE_KEYS.menus);// pego o valor no localStore
        
        if(menu==null){ // Existe usuário
            return null;
        }else{
            return JSON.parse(menu);
        }
    }

    // retorna carringo de compras
    getCart() : Carrinho{
        let str = localStorage.getItem(STORAGE_KEYS.car);// pego o valor no localStore
        
        if(str!=null){ // Existe carrinho
            return JSON.parse(str);
        }else{
            return null;
        }
    }

    // adiciona carrinho
    setCart(obj : Carrinho){
        if(obj != null ){ // se o objeto for nulo
            localStorage.setItem(STORAGE_KEYS.car,JSON.stringify(obj));
        }else{ // armazenar no localStorage em formato Text (String)
            
            localStorage.removeItem(STORAGE_KEYS.car);
        }
    }
}