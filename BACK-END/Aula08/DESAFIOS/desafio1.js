const entrada = require("readline-sync");

const nome = entrada.question("Digite seu nome: ");
const idade = entrada.questionInt("Digite sua idade: ");
const autorizacao = entrada.question("Possui autorizacao: s ou n \n");
const acompanhado = entrada.question("Esta acompanhado: s ou n \n");
const suspenso = entrada.question("Ele esta suspenso: s ou n \n");

if (idade >= 16 && autorizacao == s &&  acompanhado == s && suspenso == s) {
    console.log("Acesso negado !");
} else if (idade >= 16 && autorizacao == s &&  acompanhado == s && suspenso == n) {
    console.log("Está liberado !");
} else if (idade <= 15 && autorizacao == n && acompanhado == s && suspenso == n) {
    console.log("Está liberado !");
} else if (idade <= 15 && autorizacao == s && acompanhado == n && suspenso == n) {
    console.log("Acesso Negado !");
} else if (idade <= 15 && autorizacao == n && acompanhado == s && suspenso == s) {
    console.log("Acesso Negado !");
} else if (idade <= 15 && autorizacao == s && acompanhado == n && suspenso == s) {
    console.log("Está liberado !");
} 