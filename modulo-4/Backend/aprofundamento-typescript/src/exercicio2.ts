//Exerc2
enum CoresFavoritas {
    VERMELHO = "vermelho",
    LARANJA = "laranja",
    AMARELO = "amarelo",
    VERDE = "verde",
    AZULCLARO = "azul claro",
    AZUL = "Azul",
    ROXO = "roxo"
}
const pessoa: { nome: string, idade: number, cores: string } = { nome: "Pamela", idade: 23, cores: CoresFavoritas.ROXO }
console.log(pessoa)
