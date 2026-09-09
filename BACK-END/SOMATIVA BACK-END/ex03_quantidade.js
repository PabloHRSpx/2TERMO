const entrada = require('readline-sync');

console.log("=== LEITOR DE PESO DE PECAS ===")

const peso = entrada.questionInt("Qual o peso da peca: ");

if (peso < 105 && peso > 95 ) {
    console.log("PECA APROVADA");
} else {
    console.log("PECA REPROVADA");
}

console.log("===================");