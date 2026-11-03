const fs = require('fs');

const nomeDoArquivo = "maquinas.json";

if(!fs.existsSync(nomeDoArquivo)) {
    console.error(`Erro: o Arquivo '${nomeDoArquivo}' nao foi encontrado`);
};

const conteudoTexto = fs.readFileSync(nomeDoArquivo, 'utf-8');

const maquinasRecuperadas = JSON.parse(conteudoTexto);

function buscarPorId(maquinas, id) {
    return maquinas.find((maquina) => maquina.id === id);
}

function filtrarPorStatus(maquinas, status) {
    return maquinas,filter((maquina) => maquina.status === status);
}

console.log("Dados carregado com sucesso!\n");
console.table(maquinasRecuperadas);

console.log(`Total de maquinas cadastradas ${maquinasRecuperadas.length}`);

console.log(`Primeira maquina da lista: ${maquinasRecuperadas[0].nome}`);

function executar() {
    console.log(`\n=== Busca pelo ID 3 ===`);
    console.table(buscarPorId(maquinasRecuperadas, 3) ?? 'Maquina nao encontrada');

    console.log(`\n=== MAQUINAS EM MANUTENCAO ===`);
    console.table(filtrarPorStatus(maquinasRecuperadas, 'manutencao'));
}
executar()