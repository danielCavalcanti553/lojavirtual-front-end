import { RefProdutoDTO } from "./ref-produto.dto";

export interface ItemPedidoDTO{
    quantidade : number;
    produto : RefProdutoDTO;
    preco : number;
    imageUrl?: string;
}