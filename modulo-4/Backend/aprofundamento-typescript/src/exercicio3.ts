//Exerc.3
type Output = {
    maior: number
    menor: number
    media: number
}
function obterEstatisticas(numeros: number[]): Output {
    const numerosOrdenados = numeros.sort(
        (a, b) => a - b
    )
    let soma: number = 0
    for (let num of numeros) {
        soma += num
    }
    const estatisticas: Output = {
        maior: numerosOrdenados[numeros.length - 1],
        menor: numerosOrdenados[0],
        media: soma / numeros.length
    }
    return estatisticas
}
