const entrada = require('readline-sync');

console.log("=== PROGRAMA DE CALCULAR PECAS POR HORA ===")

const pecas = entrada.questionInt("Quantidade de pecas produzidas por hora: ");
const turno = entrada.questionInt("Quantidade de horas de turno foram: ");

const total = (pecas * turno);

console.log("=== RESULTADO ===");

console.log(`A quantidade de pecas produzidas por hora: ${pecas}`);
console.log(`A quantidade de horas: ${turno}`);
console.log(`A quantidade de pecas produzidas pelo total de horas: ${total}`);

console.log("==============================");
