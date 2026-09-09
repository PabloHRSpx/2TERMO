const entrada = require('readline-sync');
const oficina = require('./funcoesManutencao');


const peca = entrada.questionFloat("Preco da peca: R$ ");
const horas = entrada.questionFloat("Horas de servico: ");
const tempoUso = entrada.questionFloat("Meses desde o ultimo conserto: R$ ");

const total = oficina.calcularOrcamento(peca, horas);

const garantia = oficina.verificarGarantia(tempoUso);

console.log("\n=== RESULTADO ===");
console.log(`Orcamento: R$ ${total.toFixed(2)}`);
console.log(`Status Garantia: ${garantia}`);
console.log("======================");