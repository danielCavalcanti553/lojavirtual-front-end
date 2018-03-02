import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"; // Retirei "src/client" para importar todos de http
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDTO } from "../../models/categoria.dto";
import { Observable } from "rxjs/Rx"; // Rx é a importação correta, Obsevable é incompleta

@Injectable() // Permite que seja injetado
export class CategoriaService{

    constructor(public http:HttpClient){
    }

    findAll() : Observable<CategoriaDTO[]>{
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
        // Crase - coloco variáveis dentro de uma String
        // Próximo passo -> Providers (Provedor de serviço)
        // Providers -> Qual escopo será instanciado o serviço
        // Onde devo instanciar o serviço? Caso seja no app.module.ts será uma única instância para toda a aplicação
            // Caso seja registrado no module da página, terá a instância para ela
    
    }
}