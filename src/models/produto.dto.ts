export interface ProdutoDTO{
    codigoProduto: string;
    nomeProduto: string;
    preco: number;
    quantidadeEstoque: number;
    imageUrl?:string;
}