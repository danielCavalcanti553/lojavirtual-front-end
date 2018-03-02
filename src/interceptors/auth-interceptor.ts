import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storage.service'; // IMPORTANTE: IMPORT ATUALIZADO
import { API_CONFIG } from '../config/api.config';
@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(public storage:StorageService){
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        
        let localUser = this.storage.getLocalUser();
        
        // Verificando se a requisição é da minha API
        // Desta forma o cabeçalho authorization irá somente para minha API
        let N = API_CONFIG.baseUrl.length;
        let requestToAPI = req.url.substring(0,N) == API_CONFIG.baseUrl;

        // verificando se existe localUser e a API de envio for a minha API
        if(localUser && requestToAPI){ // 
            // Clonar a requisição
            const authReq = req.clone({headers: req.headers.set('Authorization','Bearer '+localUser.token)});
            return next.handle(authReq);  //retornar a requisição clonada
        }

        //retornar a requisição
        return next.handle(req);
    }

}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
}

