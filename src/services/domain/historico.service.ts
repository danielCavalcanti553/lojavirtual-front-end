import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"; // Retirei "src/client" para importar todos de http
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx"; // Rx é a importação correta, Obsevable é incompleta
import { HistoricoDTO } from "../../models/historico.dto";

@Injectable() // Permite que seja injetado
export class HistoricoService{


    constructor(public http:HttpClient){
    }

    findAll(page : number = 0, linesPage : number = 15) : Observable<HistoricoDTO[]>{
        return this.http.get<HistoricoDTO[]>(`${API_CONFIG.baseUrl}/historico/?page=${page}&linesPage=${linesPage}`);
    
    }
}