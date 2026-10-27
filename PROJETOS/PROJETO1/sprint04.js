// Lista que guarda os produtos adicionados ao carrinho
var carrinho = [];

var botoesAdicionar = document.querySelectorAll('.add-button');
var areaCarrinho = document.getElementById('cart-items');
var totalCarrinho = document.getElementById('cart-total');
var quantidadeCarrinho = document.getElementById('cart-count');
var botaoLimpar = document.getElementById('clear-cart');
var formularioPesquisa = document.querySelector('.search-form');
var campoPesquisa = document.getElementById('search-input');

// Adiciona um produto ao carrinho
function adicionarProduto(nome, preco) {
    var produto = {
        nome: nome,
        preco: preco
    };

    carrinho.push(produto);
    mostrarCarrinho();
    alert(nome + ' foi adicionado ao carrinho.');
}

// Mostra os produtos que estão no carrinho
function mostrarCarrinho() {
    areaCarrinho.innerHTML = '';

    if (carrinho.length === 0) {
        areaCarrinho.innerHTML = '<p>O carrinho está vazio.</p>';
    }

    var total = 0;

    for (var i = 0; i < carrinho.length; i++) {
        var produto = carrinho[i];
        total = total + produto.preco;

        var item = document.createElement('p');
        item.innerHTML = produto.nome + ' - R$ ' + produto.preco.toFixed(2).replace('.', ',');

        var botaoRemover = document.createElement('button');
        botaoRemover.innerHTML = 'Remover';
        botaoRemover.className = 'remove-button';
        botaoRemover.setAttribute('data-indice', i);

        item.appendChild(botaoRemover);
        areaCarrinho.appendChild(item);
    }

    totalCarrinho.innerHTML = total.toFixed(2).replace('.', ',');
    quantidadeCarrinho.innerHTML = carrinho.length;
}

// Ativa os botões dos produtos
for (var i = 0; i < botoesAdicionar.length; i++) {
    botoesAdicionar[i].addEventListener('click', function () {
        var nome = this.getAttribute('data-name');
        var preco = Number(this.getAttribute('data-price'));
        adicionarProduto(nome, preco);
    });
}

// Remove um produto do carrinho
areaCarrinho.addEventListener('click', function (event) {
    if (event.target.className === 'remove-button') {
        var indice = event.target.getAttribute('data-indice');
        carrinho.splice(indice, 1);
        mostrarCarrinho();
    }
});

// Limpa todos os produtos do carrinho
botaoLimpar.addEventListener('click', function () {
    carrinho = [];
    mostrarCarrinho();
});

// Pesquisa produtos pelo nome
formularioPesquisa.addEventListener('submit', function (event) {
    event.preventDefault();

    var texto = campoPesquisa.value.toLowerCase();
    var produtos = document.querySelectorAll('.product-card');

    for (var i = 0; i < produtos.length; i++) {
        var nomeProduto = produtos[i].querySelector('h4').innerHTML.toLowerCase();

        if (nomeProduto.indexOf(texto) !== -1) {
            produtos[i].style.display = '';
        } else {
            produtos[i].style.display = 'none';
        }
    }
});

// Mostra o carrinho vazio quando a página é aberta
mostrarCarrinho();