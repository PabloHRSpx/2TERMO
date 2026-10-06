const fs = require('fs');

console.log("=== SISTEMA E PERSISTENCIA: REGISTRO DE MAQUINAS ===");

// 1. Definição da estrutura de dados em memória (Array de Objetos)
const maquinasIndustriais = [
    { id: 101, nome: "Torno Mecanico Universal", setor: "Usinagem", operacional: true },
    { id: 102, nome: "Fresadora Ferramenteira", setor: "Usinagem", operacional: false },
    { id: 103, nome: "Prensa Hidraulica 50T", setor: "Estampagem", operacional: true }
];

// 2. Conversão da estrutura em formato texto legivel (JSON indentado)
const dadosParaGravar = JSON.stringify(maquinasIndustriais, null, 2);

// 3. Gravação fisica no disco rigido
const nomeDoArquivo = "maquinas,json";
fs.writeFileSync(nomeDoArquivo, dadosParaGravar);

console.log(`\n Gravacao concluida com sucesso.`);
console.log(`Verifique o arquivo '${nomeDoArquivo}' gerado na barra lateral do VS Code.`);