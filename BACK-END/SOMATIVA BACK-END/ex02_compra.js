const entrada = require('readline-sync');

console.log("=== CALCULAR O CUSTO DE UMA COMPRA DE MATERIA-PRIMA ===")

const nome = entrada.question("Digite o nome do material: ");
const quantidade = entrada.questionInt("Digite a quantidade que deseja comprar: ");
const preco = entrada.questionFloat("Digite o preco de cada unidade: R$ ");

const total = (quantidade * preco);

console.log("=== RESULTADO ===");

console.log(`Quantas unidades: ${quantidade}`);
console.log(`Valor unitario: R$ ${preco.toFixed(2)}`);
console.log(`Valor total: R$ ${total.toFixed(2)}`);

console.log("========================");