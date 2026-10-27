(function () {
    'use strict';

    var botoesAdicionar = document.querySelectorAll('.add-button');
    var areaCarrinho = document.getElementById('cart-items');
    var totalCarrinho = document.getElementById('cart-total');
    var quantidadeCarrinho = document.getElementById('cart-count');
    var botaoLimpar = document.getElementById('clear-cart');
    var botaoFinalizar = document.getElementById('checkout-button');
    var mensagemFinalizacao = document.getElementById('checkout-message');
    var painelPagamento = document.getElementById('payment-panel');
    var formularioPagamento = document.getElementById('payment-form');
    var campoSenhaDemo = document.getElementById('demo-password');
    var botaoVoltarPagamento = document.getElementById('cancel-payment');
    var formularioPesquisa = document.querySelector('.search-form');
    var campoPesquisa = document.getElementById('search-input');

    function formatarMoeda(valor) {
        return Number(valor).toFixed(2).replace('.', ',');
    }

    function atualizarDisponibilidadeProdutos(resumo) {
        var cartoes = document.querySelectorAll('.product-card');

        Array.prototype.forEach.call(cartoes, function (cartao) {
            var titulo = cartao.querySelector('h4');
            var botao = cartao.querySelector('.add-button');

            if (!titulo || !botao) {
                return;
            }

            var produto = window.BancoDados.buscarProdutoPorNome(titulo.textContent);

            if (!produto) {
                return;
            }

            var itemNoCarrinho = resumo.itens.find(function (item) {
                return item.produtoId === produto.id;
            });
            var quantidadeNoCarrinho = itemNoCarrinho ? itemNoCarrinho.quantidade : 0;
            var quantidadeDisponivel = Math.max(0, produto.estoque - quantidadeNoCarrinho);
            var indicador = cartao.querySelector('.stock-availability');

            if (!indicador) {
                indicador = document.createElement('p');
                indicador.className = 'stock-availability';
                cartao.insertBefore(indicador, botao);
            }

            indicador.textContent = quantidadeDisponivel > 0
                ? 'Disponível para adicionar: ' + quantidadeDisponivel
                : 'Limite disponível atingido';

            botao.disabled = quantidadeDisponivel === 0;
            botao.setAttribute('aria-label', quantidadeDisponivel > 0
                ? 'Adicionar ' + produto.nome + ' ao carrinho. ' + quantidadeDisponivel + ' unidade(s) disponível(is).'
                : 'Limite disponível atingido para ' + produto.nome);
        });
    }

    function mostrarCarrinho() {
        var resumo = window.BancoDados.obterCarrinho();
        areaCarrinho.innerHTML = '';

        if (resumo.itens.length === 0) {
            areaCarrinho.innerHTML = '<p>O carrinho está vazio.</p>';
        } else {
            resumo.itens.forEach(function (produto) {
                var item = document.createElement('div');
                var texto = document.createElement('span');
                var botaoRemover = document.createElement('button');

                item.className = 'cart-item';
                texto.textContent = produto.nome + ' — ' + produto.quantidade + ' x R$ '
                    + formatarMoeda(produto.preco) + ' = R$ ' + formatarMoeda(produto.subtotal);

                botaoRemover.type = 'button';
                botaoRemover.textContent = 'Remover';
                botaoRemover.className = 'remove-button';
                botaoRemover.setAttribute('data-produto-id', produto.produtoId);

                item.appendChild(texto);
                item.appendChild(botaoRemover);
                areaCarrinho.appendChild(item);
            });
        }

        totalCarrinho.textContent = formatarMoeda(resumo.subtotal);
        quantidadeCarrinho.textContent = resumo.quantidadeItens;
        botaoFinalizar.disabled = resumo.itens.length === 0;

        if (resumo.itens.length === 0) {
            painelPagamento.hidden = true;
            campoSenhaDemo.value = '';
        }

        atualizarDisponibilidadeProdutos(resumo);
    }

    function adicionarProduto(nome) {
        var produto = window.BancoDados.buscarProdutoPorNome(nome);

        if (!produto) {
            window.alert('Esse produto não está cadastrado no banco de dados.');
            return;
        }

        try {
            window.BancoDados.adicionarAoCarrinho(produto.id, 1);
            mostrarCarrinho();
            window.alert(produto.nome + ' foi adicionado ao carrinho.');
        } catch (erro) {
            window.alert(erro.message);
        }
    }

    Array.prototype.forEach.call(botoesAdicionar, function (botao) {
        botao.addEventListener('click', function () {
            adicionarProduto(botao.getAttribute('data-name'));
        });
    });

    areaCarrinho.addEventListener('click', function (evento) {
        var botaoRemover = evento.target.closest('.remove-button');

        if (!botaoRemover) {
            return;
        }

        window.BancoDados.removerDoCarrinho(botaoRemover.getAttribute('data-produto-id'));
        mostrarCarrinho();
    });

    botaoLimpar.addEventListener('click', function () {
        window.BancoDados.limparCarrinho();
        mostrarCarrinho();
    });

    botaoFinalizar.addEventListener('click', function () {
        if (botaoFinalizar.disabled) {
            return;
        }

        mensagemFinalizacao.textContent = '';
        painelPagamento.hidden = false;
        painelPagamento.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        campoSenhaDemo.focus();
    });

    botaoVoltarPagamento.addEventListener('click', function () {
        painelPagamento.hidden = true;
        campoSenhaDemo.value = '';
        mensagemFinalizacao.textContent = 'Finalização cancelada. O carrinho continua salvo.';
        botaoFinalizar.focus();
    });

    formularioPagamento.addEventListener('submit', function (evento) {
        evento.preventDefault();

        if (!formularioPagamento.checkValidity()) {
            formularioPagamento.reportValidity();
            return;
        }

        if (campoSenhaDemo.value.trim().length < 4) {
            campoSenhaDemo.setCustomValidity('Digite pelo menos 4 caracteres fictícios.');
            campoSenhaDemo.reportValidity();
            campoSenhaDemo.setCustomValidity('');
            return;
        }

        var opcaoPagamento = formularioPagamento.querySelector('input[name="payment-method"]:checked');
        var metodoPagamento = opcaoPagamento ? opcaoPagamento.value : '';

        // A senha só é usada para validar o formulário demonstrativo; nunca vai ao banco.
        campoSenhaDemo.value = '';

        try {
            var pedido = window.BancoDados.criarPedido({ metodoPagamento: metodoPagamento });
            mensagemFinalizacao.textContent = 'Pedido registrado (pagamento simulado; nenhuma cobrança foi feita). Número: '
                + pedido.id + ' — Total: R$ ' + formatarMoeda(pedido.total)
                + ' — Forma de pagamento: ' + pedido.metodoPagamento + '.';
            painelPagamento.hidden = true;
            formularioPagamento.reset();
            mostrarCarrinho();
        } catch (erro) {
            mensagemFinalizacao.textContent = 'Não foi possível registrar o pedido: ' + erro.message;
        }
    });

    formularioPesquisa.addEventListener('submit', function (evento) {
        evento.preventDefault();

        var texto = campoPesquisa.value.trim().toLowerCase();
        var produtos = document.querySelectorAll('.product-card');

        Array.prototype.forEach.call(produtos, function (produto) {
            var nomeProduto = produto.querySelector('h4').textContent.toLowerCase();
            produto.style.display = !texto || nomeProduto.indexOf(texto) !== -1 ? '' : 'none';
        });
    });

    mostrarCarrinho();
})();
