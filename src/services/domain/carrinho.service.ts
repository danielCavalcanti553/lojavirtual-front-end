import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Carrinho } from "../../models/carrinho";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class CarrinhoService{
    constructor(public storage : StorageService){
    }

    createOrClearCart() : Carrinho{
        let car : Carrinho = {items: []};
        this.storage.setCart(car);
        return car;
    }


    getCarrinho() : Carrinho {
        let car : Carrinho = this.storage.getCart();
        if(car==null){ // se o carrinho não existir, crie
            car = this.createOrClearCart();
        }
        return car;
    }

    // Adicionando produto ao carrinho
    addProduto(produto : ProdutoDTO) : Carrinho{
        let car = this.getCarrinho();
        // Verifica se existe o produto no carrinho
        let position = car.items.findIndex(x => x.produto.codigoProduto==produto.codigoProduto);
        if(position == -1){ // -1 -> Não existe
            car.items.push({quantidade: 1, produto:produto});
        }
        this.storage.setCart(car);
        return car;
    }

    // excluir produto carrinho
    removeProduto(produto : ProdutoDTO) : Carrinho{
        let cart = this.getCarrinho();
        // Verifica se existe o produto no carrinho
        let position = cart.items.findIndex(x => x.produto.codigoProduto==produto.codigoProduto);
        if(position!= -1){ // -1 -> Não existe
            cart.items.splice(position,1);
        }
        this.storage.setCart(cart);
        return cart;
    }

    // incluir quantidade
    incrementItem(produto : ProdutoDTO) : Carrinho{
        let cart = this.getCarrinho();
        // Verifica se existe o produto no carrinho
        let position = cart.items.findIndex(x => x.produto.codigoProduto==produto.codigoProduto);
        if(position!= -1){ // -1 -> Não existe

            if(cart.items[position].produto.quantidadeEstoque>cart.items[position].quantidade){
                cart.items[position].quantidade++;
            }


        }
        this.storage.setCart(cart);
        return cart;
    }

    // incluir quantidade
    decrementItem(produto : ProdutoDTO) : Carrinho{
        let cart = this.getCarrinho();
        // Verifica se existe o produto no carrinho
        let position = cart.items.findIndex(x => x.produto.codigoProduto==produto.codigoProduto);
        if(position!= -1){ // -1 -> Não existe
            cart.items[position].quantidade--;
            if(cart.items[position].quantidade < 1){
                cart = this.removeProduto(produto); 
            }
        }
        this.storage.setCart(cart);
        return cart;
    }

    total(){
        let cart = this.getCarrinho()
        let sum = 0;
        for(var i = 0; i<cart.items.length; i++){
            sum += cart.items[i].produto.preco * cart.items[i].quantidade;
        }
        return sum;
    }


}