const entrada = require(`readline-sync`);

const nome = entrada.question("Qual seu nome: ");
const idade = entrada.question("Qual sua idade: ");

if (idade >= 16) {
    console.log(`Seu nome é ${nome}, e você tem ${idade} anos, e você pode votar!`);
} else {
    console.log(`Você não pode votar, porque você tem ${idade}`);
}