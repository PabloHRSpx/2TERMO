const entrada = require("readline-sync");

console.log("=== SISTEMA DE QUALIDADE ===");

const pesos = [];

const quantidade = entrada.questionFloat("Quantos pesos deseja avaliar: ");


for (let i = 0; i < quantidade; i++) {
    let peso = entrada.questionInt(`Digite o peso da peca ${i + 1}:`);
    pesos.push(peso);
}


console.log("=== RELATORIO DA AUDITORIA ===");

console.log(`Pesos registrados: ${pesos.join("kg |")}kg`);

