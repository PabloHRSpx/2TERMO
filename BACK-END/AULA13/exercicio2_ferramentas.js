const entrada = require('readline-sync');
const fs = require('fs');

console.log("=== FERRAMENTAS ===");

const ferramnetas = [];

const item = entrada.questionInt("Digite a quantidade de ferramentas ira registrar: ");

for (let i = 0; i < item; i++ ) {
    console.log(`Item ${i +1} de ${item}:`);
    const nome = entrada.question("Digite o nome da ferramenta: ");
    const quantidade = entrada.questionInt("Digite a quantidade dessa ferramenta: ");
    const custoUnitario = entrada.questionFloat("Digite o custo unitario: ");

    ferramnetas.push({
    nome: nome,
    quantidade: quantidade,
    custoUnitario : custoUnitario 
    });
};

const valoresGravados = JSON.stringify(ferramnetas, null, 2);

fs.writeFileSync('ferramentas.json', valoresGravados);

console.log(`\n Valores gravados com sucesso.`);
