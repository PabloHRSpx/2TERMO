const entrada = require('readline-sync');

console.log("=== MEDIDOR DE TEMPERATURA ===");

const temperatura = entrada.questionInt("Digite a temperatura da maquina: ");

if (temperatura < 60) {
    console.log("NORMAL");
} else if (temperatura > 60 && temperatura < 80) {
    console.log("ATENCAO");
} else {
    console.log("CRITICA");
}