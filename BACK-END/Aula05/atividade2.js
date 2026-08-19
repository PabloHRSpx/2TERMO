const entrada = require(`readline-sync`);

const velocidade = entrada.questionInt("Qual velocidade do veiculo: ");

if (velocidade <= 80) {
    console.log("Continue sua viagem !");
} else {
    console.log("Você será multado !")
}
