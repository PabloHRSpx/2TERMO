const entrada = require ('readline-sync');

nomes = []

for (let i = 1; i <= 5; i ++) {
    let nome = entrada.question(`Digite o nome ${i}: `);
}

nome.push(nomes);

console.log(nomes)

console.log(`Nomes cadastrados: ${nomes}`)