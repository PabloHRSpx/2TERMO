const entrada = require('readline-sync');

console.log("=== CICLO DE PRODUCAO DE PECAS ===")

const pecas = entrada.questionInt("Quantas pecas a maquina produz por ciclo: ");

for (let i = 1; i <=10; i ++) {
    console.log(`Ciclo ${i}: ${pecas*i}`);
}