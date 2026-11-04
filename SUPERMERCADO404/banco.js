/*
 * Banco de dados local do Supermercado 404.
 *
 * A implementação usa localStorage para manter os dados no navegador.
 * Não é necessário instalar servidor ou dependência externa.
 */
(function (window) {
    'use strict';

    var CHAVE_BANCO = 'supermercado404_db_v1';
    var VERSAO_BANCO = 1;

    function clonar(valor) {
        return JSON.parse(JSON.stringify(valor));
    }

    function arredondar(valor) {
        return Math.round((Number(valor) + Number.EPSILON) * 100) / 100;
    }

    function validarEstoque(valor) {
        var estoque = Number(valor);

        if (!Number.isInteger(estoque) || estoque < 0) {
            throw new Error('O estoque deve ser um número inteiro igual ou maior que zero.');
        }

        return estoque;
    }

    function normalizarTexto(texto) {
        return String(texto || '')
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }

    function gerarId(texto) {
        var id = normalizarTexto(texto)
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');

        return id || 'produto-' + Date.now();
    }

    function criarProdutosIniciais() {
        return [
            {
                id: 'arroz-branco-5kg',
                nome: 'Arroz branco 5 kg',
                descricao: 'Produto básico para o dia a dia.',
                preco: 24.90,
                categoria: 'Açúcar e alimentos básicos',
                status: 'Disponível',
                imagem: 'imagens/alimentos.jpg',
                ativo: true
            },
            {
                id: 'acucar-refinado-1kg',
                nome: 'Açúcar refinado 1 kg',
                descricao: 'Açúcar refinado para uso doméstico.',
                preco: 4.50,
                categoria: 'Açúcar e alimentos básicos',
                status: 'Disponível',
                imagem: 'imagens/alimentos.jpg',
                ativo: true
            },
            {
                id: 'alface',
                nome: 'Alface',
                descricao: 'Alface fresca selecionada.',
                preco: 2.99,
                categoria: 'Verduras',
                status: 'Disponível',
                imagem: 'imagens/variedades.jpg',
                ativo: true
            },
            {
                id: 'tomate',
                nome: 'Tomate',
                descricao: 'Tomates frescos por quilo.',
                preco: 6.99,
                categoria: 'Verduras',
                status: 'Disponível',
                imagem: 'imagens/variedades.jpg',
                ativo: true
            },
            {
                id: 'carne-moida-bovina-1kg',
                nome: 'Carne moída bovina 1 kg',
                descricao: 'Carne bovina moída fresca.',
                preco: 29.90,
                categoria: 'Açougue',
                status: 'Disponível',
                imagem: 'imagens/carnes.jpg',
                ativo: true
            },
            {
                id: 'peito-de-frango-1kg',
                nome: 'Peito de frango 1 kg',
                descricao: 'Peito de frango fresco.',
                preco: 16.90,
                categoria: 'Açougue',
                status: 'Disponível',
                imagem: 'imagens/frango.jpg',
                ativo: true
            },
            {
                id: 'linguica-toscana-1kg',
                nome: 'Linguiça toscana 1 kg',
                descricao: 'Linguiça toscana para assar.',
                preco: 19.90,
                categoria: 'Açougue',
                status: 'Disponível',
                imagem: 'imagens/costela.jpg',
                ativo: true
            },
            {
                id: 'bife-de-alcatra-1kg',
                nome: 'Bife de alcatra 1 kg',
                descricao: 'Cortes de alcatra selecionados.',
                preco: 39.90,
                categoria: 'Açougue',
                status: 'Disponível',
                imagem: 'imagens/bifes.jpg',
                ativo: true
            },
            {
                id: 'costela-suina-1kg',
                nome: 'Costela suína 1 kg',
                descricao: 'Costela suína ideal para assar.',
                preco: 24.90,
                categoria: 'Açougue',
                status: 'Disponível',
                imagem: 'imagens/costela.jpg',
                ativo: true
            },
            {
                id: 'picanha-bovina-1kg',
                nome: 'Picanha bovina 1 kg',
                descricao: 'Picanha bovina para churrasco.',
                preco: 59.90,
                categoria: 'Açougue',
                status: 'Disponível',
                imagem: 'imagens/carnes.jpg',
                ativo: true
            },
            {
                id: 'sabao-em-po-1kg',
                nome: 'Sabão em pó 1 kg',
                descricao: 'Sabão em pó para lavar roupas.',
                preco: 9.90,
                categoria: 'Produtos de limpeza',
                status: 'Em promoção',
                imagem: 'imagens/limpeza.jpg',
                ativo: true
            },
            {
                id: 'detergente-500ml',
                nome: 'Detergente 500 ml',
                descricao: 'Detergente líquido para louças.',
                preco: 2.49,
                categoria: 'Produtos de limpeza',
                status: 'Disponível',
                imagem: 'imagens/limpeza.jpg',
                ativo: true
            },
            {
                id: 'leite-integral-1l',
                nome: 'Leite integral 1 litro',
                descricao: 'Leite integral de qualidade.',
                preco: 4.99,
                categoria: 'Laticínios',
                status: 'Em promoção',
                imagem: 'imagens/variedades.jpg',
                ativo: true
            },
            {
                id: 'queijo-mussarela-200g',
                nome: 'Queijo mussarela 200 g',
                descricao: 'Queijo mussarela fatiado.',
                preco: 10.90,
                categoria: 'Laticínios',
                status: 'Disponível',
                imagem: 'imagens/variedades.jpg',
                ativo: true
            },
            {
                id: 'milho-verde-170g',
                nome: 'Milho verde 170 g',
                descricao: 'Milho verde em conserva.',
                preco: 3.99,
                categoria: 'Enlatados',
                status: 'Disponível',
                imagem: 'imagens/enlatados.jpeg',
                ativo: true
            },
            {
                id: 'atum-em-lata-170g',
                nome: 'Atum em lata 170 g',
                descricao: 'Atum em conserva.',
                preco: 7.90,
                categoria: 'Enlatados',
                status: 'Disponível',
                imagem: 'imagens/enlatados.jpeg',
                ativo: true
            }
        ].map(function (produto) {
            // Limite inicial por produto; pode ser alterado no cadastro do estoque.
            produto.estoque = 20;
            return produto;
        });
    }

    function criarBancoInicial() {
        return {
            versao: VERSAO_BANCO,
            atualizadoEm: new Date().toISOString(),
            produtos: criarProdutosIniciais(),
            cupons: [
                {
                    codigo: 'BEMVINDO10',
                    descricao: '10% de desconto na primeira compra.',
                    tipo: 'percentual',
                    valor: 10,
                    ativo: true
                },
                {
                    codigo: 'ECONOMIZE5',
                    descricao: 'R$ 5,00 de desconto em compras selecionadas.',
                    tipo: 'fixo',
                    valor: 5,
                    ativo: true
                }
            ],
            carrinho: [],
            pedidos: []
        };
    }

    function lerBanco() {
        try {
            var salvo = window.localStorage.getItem(CHAVE_BANCO);

            if (!salvo) {
                return criarBancoInicial();
            }

            var bancoSalvo = JSON.parse(salvo);

            if (!bancoSalvo || bancoSalvo.versao !== VERSAO_BANCO) {
                return criarBancoInicial();
            }

            return {
                versao: VERSAO_BANCO,
                atualizadoEm: bancoSalvo.atualizadoEm || new Date().toISOString(),
                produtos: (Array.isArray(bancoSalvo.produtos) ? bancoSalvo.produtos : criarProdutosIniciais())
                    .map(function (produto) {
                        // Migra produtos já salvos antes da inclusão do controle de estoque.
                        if (!Number.isInteger(Number(produto.estoque)) || Number(produto.estoque) < 0) {
                            produto.estoque = 20;
                        } else {
                            produto.estoque = Number(produto.estoque);
                        }
                        return produto;
                    }),
                cupons: Array.isArray(bancoSalvo.cupons) ? bancoSalvo.cupons : [],
                carrinho: Array.isArray(bancoSalvo.carrinho) ? bancoSalvo.carrinho : [],
                pedidos: Array.isArray(bancoSalvo.pedidos) ? bancoSalvo.pedidos : []
            };
        } catch (erro) {
            console.error('Não foi possível ler o banco local:', erro);
            return criarBancoInicial();
        }
    }

    var banco = lerBanco();

    function salvarBanco() {
        banco.atualizadoEm = new Date().toISOString();
        window.localStorage.setItem(CHAVE_BANCO, JSON.stringify(banco));
    }

    function obterProdutoPorId(id) {
        return banco.produtos.find(function (produto) {
            return produto.id === id && produto.ativo !== false;
        });
    }

    function buscarProdutoPorNome(nome) {
        var nomeNormalizado = normalizarTexto(nome);

        return banco.produtos.find(function (produto) {
            return produto.ativo !== false && normalizarTexto(produto.nome) === nomeNormalizado;
        });
    }

    function listarProdutos(filtros) {
        filtros = filtros || {};
        var busca = normalizarTexto(filtros.busca);
        var categoria = normalizarTexto(filtros.categoria);

        return banco.produtos
            .filter(function (produto) {
                var correspondeBusca = !busca || normalizarTexto(produto.nome).indexOf(busca) !== -1;
                var correspondeCategoria = !categoria || normalizarTexto(produto.categoria) === categoria;
                var correspondeAtivo = filtros.incluirInativos || produto.ativo !== false;

                return correspondeBusca && correspondeCategoria && correspondeAtivo;
            })
            .map(clonar);
    }

    function cadastrarProduto(dados) {
        if (!dados || !dados.nome || Number(dados.preco) < 0) {
            throw new Error('Nome e preço válido são obrigatórios.');
        }

        var idBase = dados.id || gerarId(dados.nome);
        var id = idBase;
        var contador = 2;

        while (banco.produtos.some(function (produto) { return produto.id === id; })) {
            id = idBase + '-' + contador;
            contador += 1;
        }

        var produto = {
            id: id,
            nome: String(dados.nome).trim(),
            descricao: String(dados.descricao || ''),
            preco: arredondar(dados.preco),
            categoria: String(dados.categoria || 'Outros'),
            status: String(dados.status || 'Disponível'),
            imagem: String(dados.imagem || ''),
            estoque: validarEstoque(dados.estoque === undefined ? 0 : dados.estoque),
            ativo: dados.ativo !== false
        };

        banco.produtos.push(produto);
        salvarBanco();
        return clonar(produto);
    }

    function atualizarProduto(id, alteracoes) {
        var produto = banco.produtos.find(function (item) { return item.id === id; });

        if (!produto) {
            throw new Error('Produto não encontrado.');
        }

        Object.keys(alteracoes || {}).forEach(function (campo) {
            if (campo === 'preco') {
                produto.preco = arredondar(alteracoes.preco);
            } else if (campo === 'estoque') {
                produto.estoque = validarEstoque(alteracoes.estoque);
            } else if (campo in produto && campo !== 'id') {
                produto[campo] = alteracoes[campo];
            }
        });

        salvarBanco();
        return clonar(produto);
    }

    function listarCupons() {
        return banco.cupons.filter(function (cupom) {
            return cupom.ativo !== false;
        }).map(clonar);
    }

    function obterResumoCarrinho() {
        var itens = banco.carrinho.map(function (item) {
            var produtoAtual = obterProdutoPorId(item.produtoId);
            var preco = produtoAtual ? produtoAtual.preco : item.preco;

            return {
                produtoId: item.produtoId,
                nome: produtoAtual ? produtoAtual.nome : item.nome,
                preco: arredondar(preco),
                quantidade: item.quantidade,
                subtotal: arredondar(preco * item.quantidade)
            };
        });

        return {
            itens: itens,
            quantidadeItens: itens.reduce(function (total, item) { return total + item.quantidade; }, 0),
            subtotal: arredondar(itens.reduce(function (total, item) { return total + item.subtotal; }, 0))
        };
    }

    function adicionarAoCarrinho(produtoId, quantidade) {
        quantidade = Number(quantidade || 1);

        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            throw new Error('A quantidade deve ser um número inteiro positivo.');
        }

        var produto = obterProdutoPorId(produtoId);

        if (!produto) {
            throw new Error('Produto não encontrado ou indisponível.');
        }

        var item = banco.carrinho.find(function (linha) {
            return linha.produtoId === produtoId;
        });

        var quantidadeNoCarrinho = item ? item.quantidade : 0;

        if (quantidadeNoCarrinho + quantidade > produto.estoque) {
            var disponivel = Math.max(0, produto.estoque - quantidadeNoCarrinho);
            throw new Error(disponivel === 0
                ? 'Não há mais unidades disponíveis de ' + produto.nome + ' para adicionar.'
                : 'Estoque insuficiente de ' + produto.nome + '. Você pode adicionar mais ' + disponivel + ' unidade(s).');
        }

        if (item) {
            item.quantidade += quantidade;
        } else {
            banco.carrinho.push({
                produtoId: produto.id,
                nome: produto.nome,
                preco: produto.preco,
                quantidade: quantidade
            });
        }

        salvarBanco();
        return obterResumoCarrinho();
    }

    function removerDoCarrinho(produtoId) {
        banco.carrinho = banco.carrinho.filter(function (item) {
            return item.produtoId !== produtoId;
        });

        salvarBanco();
        return obterResumoCarrinho();
    }

    function limparCarrinho() {
        banco.carrinho = [];
        salvarBanco();
        return obterResumoCarrinho();
    }

    function validarCupom(codigo, subtotal) {
        var codigoNormalizado = String(codigo || '').trim().toUpperCase();
        var cupom = banco.cupons.find(function (item) {
            return item.codigo === codigoNormalizado && item.ativo !== false;
        });
        var valorCompra = arredondar(subtotal || 0);

        if (!cupom) {
            return { valido: false, desconto: 0, mensagem: 'Cupom não encontrado ou inativo.' };
        }

        var desconto = cupom.tipo === 'percentual'
            ? arredondar(valorCompra * cupom.valor / 100)
            : arredondar(Math.min(cupom.valor, valorCompra));

        return {
            valido: true,
            codigo: cupom.codigo,
            desconto: desconto,
            mensagem: 'Cupom aplicado com sucesso.'
        };
    }

    function criarPedido(dados) {
        dados = dados || {};
        var resumo = obterResumoCarrinho();

        if (resumo.itens.length === 0) {
            throw new Error('Não é possível criar um pedido com o carrinho vazio.');
        }

        resumo.itens.forEach(function (item) {
            var produto = obterProdutoPorId(item.produtoId);

            if (!produto || item.quantidade > produto.estoque) {
                throw new Error('Estoque insuficiente para ' + item.nome + '. Remova o item ou ajuste a quantidade antes de finalizar.');
            }
        });

        var desconto = 0;
        var cupom = null;

        if (dados.codigoCupom) {
            var resultadoCupom = validarCupom(dados.codigoCupom, resumo.subtotal);

            if (!resultadoCupom.valido) {
                throw new Error(resultadoCupom.mensagem);
            }

            desconto = resultadoCupom.desconto;
            cupom = resultadoCupom.codigo;
        }

        var formasPagamentoPermitidas = [
            'Pix (simulação)',
            'Dinheiro na entrega (simulação)',
            'Cartão (simulação)'
        ];
        var formaPagamento = String(dados.metodoPagamento || 'Não informado');

        if (formaPagamento !== 'Não informado' && formasPagamentoPermitidas.indexOf(formaPagamento) === -1) {
            throw new Error('Forma de pagamento inválida.');
        }

        var pedido = {
            id: 'PED-' + Date.now(),
            criadoEm: new Date().toISOString(),
            status: 'Recebido',
            cliente: clonar(dados.cliente || {}),
            metodoPagamento: formaPagamento,
            itens: clonar(resumo.itens),
            subtotal: resumo.subtotal,
            desconto: desconto,
            cupom: cupom,
            total: arredondar(Math.max(0, resumo.subtotal - desconto))
        };

        resumo.itens.forEach(function (item) {
            var produto = obterProdutoPorId(item.produtoId);
            produto.estoque -= item.quantidade;

            if (produto.estoque === 0) {
                produto.status = 'Esgotado';
            }
        });

        banco.pedidos.push(pedido);
        banco.carrinho = [];
        salvarBanco();
        return clonar(pedido);
    }

    function listarPedidos() {
        return clonar(banco.pedidos);
    }

    function exportarDados() {
        return clonar(banco);
    }

    function resetarBanco() {
        banco = criarBancoInicial();
        salvarBanco();
        return exportarDados();
    }

    window.BancoDados = {
        chaveArmazenamento: CHAVE_BANCO,
        listarProdutos: listarProdutos,
        obterProdutoPorId: function (id) {
            var produto = obterProdutoPorId(id);
            return produto ? clonar(produto) : null;
        },
        buscarProdutoPorNome: function (nome) {
            var produto = buscarProdutoPorNome(nome);
            return produto ? clonar(produto) : null;
        },
        cadastrarProduto: cadastrarProduto,
        atualizarProduto: atualizarProduto,
        listarCupons: listarCupons,
        adicionarAoCarrinho: adicionarAoCarrinho,
        obterCarrinho: obterResumoCarrinho,
        removerDoCarrinho: removerDoCarrinho,
        limparCarrinho: limparCarrinho,
        validarCupom: validarCupom,
        criarPedido: criarPedido,
        listarPedidos: listarPedidos,
        exportarDados: exportarDados,
        resetarBanco: resetarBanco
    };

    salvarBanco();
})(window);
