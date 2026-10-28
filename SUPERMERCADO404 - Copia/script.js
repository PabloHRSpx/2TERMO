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

    
function normalizarTexto(texto) {
    return texto
        .toLocaleLowerCase('pt-BR')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
}

var formularioPesquisa = document.querySelector('.search-form');
var campoPesquisa = document.getElementById('search-input');

var listaSugestoes = document.createElement('div');
listaSugestoes.id = 'search-suggestions';

listaSugestoes.style.cssText =
    'display:none;position:absolute;top:100%;left:0;right:0;' +
    'z-index:1000;background:white;border:1px solid #ddd;' +
    'max-height:240px;overflow-y:auto;text-align:left;';

formularioPesquisa.style.position = 'relative';
formularioPesquisa.appendChild(listaSugestoes);

var estilo = document.createElement('style');
estilo.textContent = `
    #search-suggestions button {
        display: block;
        width: 100%;
        padding: 10px;
        background: white;
        color: #087f5b;
        border: 0;
        border-radius: 0;
        text-align: left;
        cursor: pointer;
    }

    #search-suggestions button:hover {
        background: #e9f7f1;
    }
`;
document.head.appendChild(estilo);

function pesquisarProdutos(texto) {
    var consulta = normalizarTexto(texto);
    var produtos = document.querySelectorAll('.product-card');
    var encontrados = 0;

    produtos.forEach(function(produto) {
        var nome = normalizarTexto(
            produto.querySelector('h4').textContent
        );

        var corresponde = !consulta || nome.includes(consulta);

        produto.style.display = corresponde ? '' : 'none';

        if (corresponde) encontrados++;
    });

    document.querySelectorAll('#categorias .cards').forEach(function(grupo) {
        var titulo = grupo.previousElementSibling;

        if (titulo && titulo.tagName === 'H3') {
            var possuiProduto = Array.from(
                grupo.querySelectorAll('.product-card')
            ).some(function(produto) {
                return produto.style.display !== 'none';
            });

            titulo.style.display = possuiProduto ? '' : 'none';
        }
    });

    var mensagem = document.getElementById('search-results-message');

    if (!mensagem) {
        mensagem = document.createElement('p');
        mensagem.id = 'search-results-message';

        var categorias = document.getElementById('categorias');
        categorias.insertBefore(mensagem, categorias.children[1]);
    }

    mensagem.style.color = '#087f5b';
    mensagem.style.fontWeight = 'bold';

    if (consulta) {
        mensagem.textContent = encontrados
            ? encontrados + (encontrados === 1
                ? ' produto encontrado.'
                : ' produtos encontrados.')
            : 'Nenhum produto encontrado.';
        mensagem.style.display = 'block';
    } else {
        mensagem.textContent = '';
        mensagem.style.display = 'none';
    }
}

function mostrarSugestoes(texto) {
    listaSugestoes.innerHTML = '';

    var consulta = normalizarTexto(texto);

    if (!consulta) {
        listaSugestoes.style.display = 'none';
        return;
    }

    var produtos = Array.from(
        document.querySelectorAll('.product-card')
    );

    var encontrados = produtos.filter(function(produto) {
        return normalizarTexto(
            produto.querySelector('h4').textContent
        ).includes(consulta);
    }).slice(0, 6);

    if (encontrados.length === 0) {
        var aviso = document.createElement('div');
        aviso.textContent = 'Nenhum produto encontrado.';
        aviso.style.padding = '10px';
        listaSugestoes.appendChild(aviso);
    }

    encontrados.forEach(function(produto) {
        var botao = document.createElement('button');

        botao.type = 'button';
        botao.textContent = produto.querySelector('h4').textContent;

        botao.addEventListener('click', function() {
            campoPesquisa.value = botao.textContent;

            pesquisarProdutos(botao.textContent);

            listaSugestoes.style.display = 'none';

            produto.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        });

        listaSugestoes.appendChild(botao);
    });

    listaSugestoes.style.display = 'block';
}

campoPesquisa.addEventListener('input', function() {
    mostrarSugestoes(campoPesquisa.value);
});

formularioPesquisa.addEventListener('submit', function(event) {
    event.preventDefault();

    pesquisarProdutos(campoPesquisa.value);
    listaSugestoes.style.display = 'none';

    document.getElementById('categorias').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

campoPesquisa.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        listaSugestoes.style.display = 'none';
    }
});

document.addEventListener('click', function(event) {
    if (!formularioPesquisa.contains(event.target)) {
        listaSugestoes.style.display = 'none';
    }
});


    mostrarCarrinho();
})();
