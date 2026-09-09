function calcularOrcamento(precoPeca, horasTrabalho) {
    const valorHora = 80;
    const totalModeObra = horasTrabalho * valorHora;
    return precoPeca + totalModeObra;
}

function verificarGarantia(meses) {
    if (meses <= 6) {
        return "EM GARANTIA";
    }else {
        return "FORA DA GARANTIA";
    }
}


module.exports = {
    calcularOrcamento,
    verificarGarantia
} 