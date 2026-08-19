const entrada = require("readline-sync")

console.log("=== REGISTRO DE TEMPERATURAS ===");

const temperaturas = [];

const quantidade = entrada.questionInt("Quantas temperaturas deseja resgistrar: ");

for (let i = 0; i < quantidade; i++) {
    let temperatura = entrada.questionInt(`Temperatura ${i +1}:`);
    temperaturas.push(temperatura);
}
console.log("\n--- RELATORIO ---");
console.log(`Temperaturas registradas: ${temperaturas.join("°C | ")} °C`)
console.log(`A quatidade de registros: ${temperaturas.length}`);
console.log(`A primeira temperatura: ${temperaturas[0]} °C `);
console.log(`A ultima temperatura: ${temperaturas[temperaturas.length -1]} °C`);  //[temperaturas.lenght -1] MOSTRA A ULTIMA TEMPERATURA