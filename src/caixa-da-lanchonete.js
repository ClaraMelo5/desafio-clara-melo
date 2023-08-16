class CaixaDaLanchonete {
    valoresProdutos = {"cafe"      :  3.00,
                       "chantily"  :  1.50,
                       "suco"      :  6.20,
                       "sanduiche" :  6.50,
                       "queijo"    :  2.00,
                       "salgado"   :  7.25,
                       "combo1"    :  9.50,
                       "combo2"    :  7.50};   

    formasDePagamento = ["credito" ,
                         "debito" ,
                         "dinheiro"];

    
    calcularValorDaCompra(metodoDePagamento, itens) {
        
        let mensagem = this.validarPedido(metodoDePagamento, itens);
        if(mensagem != "pedido valido!"){
            return mensagem;
        }
        let valorTotal = this.calcularValorTotal(itens);
        let valorComDesconto = this.obterValorDesconto(metodoDePagamento,valorTotal);
        valorComDesconto = valorComDesconto.toFixed(2);
        let retorno = 'R$ ' + valorComDesconto.toString().replace('.',',');
       
        return retorno;
        
    
    }

    validarPedido(metodoDePagamento, itens){
        let mensagem = "pedido valido!";
        if (!Array.isArray(itens) || !itens.length ) return "Não há itens no carrinho de compra!";
       
        
        
        if(!this.formasDePagamento.includes(metodoDePagamento)) return "Forma de pagamento inválida!";
        let existeQueijo = false;
        let existeChantily = false;
        let todosProdutosItens = [];
        
        for(let i= 0; i < itens.length; i++ ){
            
            let pedido = itens[i].split(",");
            let produto = pedido[0].trim();
            let codigosProdutos = Object.keys(this.valoresProdutos)
           
            if(!codigosProdutos.includes(produto)) return "Item inválido!";
            todosProdutosItens.push(produto);
            let quantidade = pedido[1].trim();
            if(quantidade == "0" ) return "Quantidade inválida!";  
            if(produto == "queijo" ) existeQueijo = true;
            if(produto == "chantily" ) existeChantily = true;
            
        }
        console.log(todosProdutosItens);
        if(existeQueijo && !todosProdutosItens.includes("sanduiche")) return "Item extra não pode ser pedido sem o principal";

        if(existeChantily && !todosProdutosItens.includes("cafe")) return "Item extra não pode ser pedido sem o principal";
        
        

        return mensagem;
    }

    
    calcularValorTotal(itens){
        let totalValorPedidos = 0;
        for(let i= 0; i < itens.length; i++ ){
            let pedido = itens[i].split(',');
            let produto = pedido[0].trim(); 
            let quantidade = pedido[1].trim(); 

            let valorProduto = this.obterValorProduto(produto);
            totalValorPedidos = totalValorPedidos + (valorProduto * quantidade);
        }
        return totalValorPedidos;
    }

    obterValorProduto(produto){
        return this.valoresProdutos[produto];
    }

    obterValorDesconto(metodoDePagamento, valorCompra){

        switch(metodoDePagamento){
            case "credito":
                return valorCompra*1.03;
            case "debito":
                return valorCompra;
            case "dinheiro":
                return valorCompra*0.95;
        }
    
    }
   
    
}

export { CaixaDaLanchonete };
