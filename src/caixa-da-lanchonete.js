class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        const nomesItems = []
        for (const item of itens) {
            let indexVirgula = item.indexOf(',');
            let codigoItem = item.substring(0, (indexVirgula));
            nomesItems.push(codigoItem);
        }

        if(itens.length == 0) {
            return MENSAGEM_ERROR_CARRINHO
        }
        let total = 0
        for (const item of itens) {
            let indexVirgula = item.indexOf(',');
            let codigoItem = item.substring(0, (indexVirgula));
            let quantidadeItem = item.substring(indexVirgula+1, item.length);

            if (codigoItem == 'queijo') {
                if (nomesItems.includes('sanduiche') == false) {
                    return MENSAGEM_ERROR_ITEM_EXTRA
                }
            } else if (codigoItem == 'chantily') {
                if (nomesItems.includes('cafe') == false) {
                    return MENSAGEM_ERROR_ITEM_EXTRA 
                }
            } else if (quantidadeItem == 0) {
                return MENSAGEM_ERROR_QUANTIDADE_INVALIDA
            } else if (metodoDePagamento == 'dinheiro' && quantidadeItem == 0) {
                return MENSAGEM_ERROR_QUANTIDADE_INVALIDA
            }

            let valorItem = this.retornarValorDoItem(codigoItem)
            if (valorItem == 'invalido') {
                return MENSGEM_ERROR_ITEM_INVALIDO
            }
           
            total += valorItem * quantidadeItem;
        }
        let desconto = this.retornarDesconto(metodoDePagamento, total)
        if (desconto == 'invalido') {
            return MENSAGEM_ERROR_FORMA_PAGAMENTO
        }
        total = total + desconto
        return SIMBOLO_REAL + total.toFixed(2).replace('.', ',');
    }

    retornarDesconto(metodoDePagamento, total) {
        let desconto = 0
        switch (metodoDePagamento) {
            case 'dinheiro': desconto = -(total * 0.05); break;
            case 'credito': desconto = +(total * 0.03); break;
            case 'debito': desconto = 0; break;
            default: desconto = 'invalido'; break;
        }
        console.log("Desconto = " + desconto)
        return desconto;
    }

    retornarValorDoItem(codigoItem) {
        let valor = 0;
        switch (codigoItem) {
            case 'cafe': valor = 3.00; break;
            case 'chantily': valor = 1.50; break;
            case 'suco': valor = 6.20; break;
            case 'sanduiche': valor = 6.50; break;
            case 'queijo': valor = 2.00; break;
            case 'salgado': valor = 7.25; break;
            case 'combo1': valor = 9.50; break;
            case 'combo2': valor = 7.50; break;
            default: valor = 'invalido'; break;
        }
        console.log("Valor definido: " + valor);
        return valor;
    }

}

const MENSAGEM_ERROR_QUANTIDADE_INVALIDA = "Quantidade inválida!";
const MENSGEM_ERROR_ITEM_INVALIDO = "Item inválido!";
const MENSAGEM_ERROR_FORMA_PAGAMENTO = "Forma de pagamento inválida!";
const MENSAGEM_ERROR_ITEM_EXTRA = "Item extra não pode ser pedido sem o principal"
const MENSAGEM_ERROR_CARRINHO = "Não há itens no carrinho de compra!"
const SIMBOLO_REAL = "R$ "
    
export { CaixaDaLanchonete };
