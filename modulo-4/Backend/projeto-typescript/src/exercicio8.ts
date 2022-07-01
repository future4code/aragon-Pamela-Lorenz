function verificaValidadeRG(dataDeNascimento: string, dataEmissao: string): boolean | number {
    const dataAtual: number = +
    const dataDeNascimento: number = +
    const dataEmissao: number = +
    const idade = dataAtual - dataDeNascimento
    const prazoRg = dataAtual - dataEmissao

    const exigencia1 = idade <= 25 && prazoRg >= 5
    const exigencia2 = idade > 26 && idade <= 50 && prazoRg >= 10
    const exigencia3 = idade > 50 && prazoRg >= 15

    return (exigencia1 || exigencia2 || exigencia3)
}
console.log(verificaValidadeRG("15/15/1998", "16/03/2010"))

