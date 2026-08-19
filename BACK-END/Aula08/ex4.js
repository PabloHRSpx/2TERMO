const entrada = require("readline-sync");

console.log("------------------------");
console.log("SISTEMA DE CLASSIFICAÇÃO");
console.log("------------------------");

const nome = entrada.question("Nome do atleta: ");
const idade = entrada.questionInt("Idade do atleta: ");

console.log(`\n Atleta: ${nome}`)

if (idade < 5) {
    console.log("SITUAÇÃO: Muito jovem para a competição! ");
}
 else if (idade >= 5 && idade <= 10) {
    console.log("CATEGORIA: Infantil 😊")
}
else if (idade >= 11 && idade <= 17) {
    console.log("CATEGORIA: Juvenil 😜")
}
else if (idade >= 18 && idade <=60) {
    console.log("CATEGORIA: Adulto 😒")
}
else {
    console.log("CATEGORIA: Sênior 👵")
}
console.log("------------------------");