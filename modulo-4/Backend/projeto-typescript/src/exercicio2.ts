function dados(nome: string, dataDeNascimento: string): string {
    const data = dataDeNascimento.split("/")
    return `Olá, meu nome é ${nome} nasci no dia ${data[0]} do mês ${data[1]} do ano ${data[2]}.`
}
console.log(dados("Pâmela", "15/10/1998"))


//console.log("15/10/1998".split("/"))
