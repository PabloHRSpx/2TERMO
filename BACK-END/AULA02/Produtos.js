//Importando a biblioteca (a "ajudinha" que instalamos)
const entrada = require('readline-sync');

// 1. Entrada de dados pelo terminal
// O computador para e espera o usuário digitar
const nomeProduto = entrada.question("Qual o nome do produto? ");
const precoUnitario = entrada.questionFloat("Qual o preco unitario? ")
const quantidade = entrada.questionInt("Quantas unidades foram vendidas? ")

// 2. Processamento (A conta)
const total = precoUnitario * quantidade;

// 3. Saída de dados personalizado
console.log("\n--- RECIBO DE VENDA ---");
console.log(`Produto: ${nomeProduto}`);
console.log(`Total a pagar: R$ ${total.toFixed(2)}`);
// O .tofixed(2) coloca 2 casas decimais.
