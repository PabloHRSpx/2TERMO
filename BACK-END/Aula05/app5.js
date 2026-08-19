const entrada = require(`readline-sync`);

console.log("--- SISTEMA DE ANÁLISE DE CRÉDITO ---");

//Coleta de Dados
const nome = entrada.question("Nome do Cliente: ");
const idade = entrada.questionInt("Idade: ");
const renda = entrada.questionFloat("Renda Mensal: ");
const temImovel = entrada.keyInYNStrict("Possui imovel proprio? "); // Essa Função lê Y para true e N para false

// A lógica combina
// (idade >= 18) é obrigatória
// (renda >= 2500 || temImovel === true) um dos dois tem que ser verdade
if (idade >= 18 && (renda >= 2500 || temImovel == true)) {
    console.log(`\nPARABENS, ${nome}! Seu crédito foi APROVADO!`);
} else {
    console.log(`\nSinto muito, ${nome}. Seu crédito foi NEGADO.`);
}

