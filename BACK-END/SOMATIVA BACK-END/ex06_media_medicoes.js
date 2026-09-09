const entrada = require('readline-sync');

media = []

for (let i = 1; i <= 5; i++) {
    let media = entrada.questionInt(`Digite a sua media ${i}: `);
}