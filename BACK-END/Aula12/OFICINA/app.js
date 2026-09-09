const entrada = require('readline-sync');
const oficina = require('./funcoesOficina');

console.log("=== SISTEMA DE GESTÃO DE OFICINA 1.0 ===")

const peca = entrada.questionFloat("Preco da peca: R$ ");
const horas = entrada.questionFloat("Horas de servico: ");
const tempoUso = entrada.questionFloat("Meses desde o ultimo conserto: R$ ");

const total = oficina.calcularOrcamento(peca, horas);
const orcamentoComDesconto = oficina.valorComDesconto(total);

const garantia = oficina.verificarGarantia(tempoUso);

console.log("\n=== RELATORIO DE SERVICO ===");
console.log(`Orcamento: R$ ${total.toFixed(2)}`);
console.log(`Orcamento com 20% de desconto: R$ ${orcamentoComDesconto.toFixed(2)}`);
console.log(`Status Garantia: ${garantia}`);
console.log("===============================");