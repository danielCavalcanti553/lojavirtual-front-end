import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"; // Retirei "src/client" para importar todos de http
import { API_CONFIG } from "../../config/api.config";
import { PedidoDTO } from "../../models/pedido.dto";

@Injectable() // Permite que seja injetado
export class PedidoService{

    constructor(public http:HttpClient){
    }

    inserir(obj : PedidoDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/pedidos`,
            obj,
            {
                observe: 'response',
                responseType:'text'
            }
        );
    }

    findByEstoque(page : number = 0, linesPage : number = 15){
       return this.http.get<PedidoDTO>(`${API_CONFIG.baseUrl}/pedidos?page=${page}&linesPage=${linesPage}`);
    }
}