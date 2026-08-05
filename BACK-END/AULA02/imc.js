const entrada = require("readline-sync");
const peso = entrada.questionFloat("Qual o seu peso em kg: ");
const altura = entrada.questionFloat("Qual a sua altura: ");
const imc = (altura * altura);

console.log(`O seu imc é: ${imc.toFixed(2)}`);