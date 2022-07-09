export type Pagamento = {
    descricao: string,
    valorPago: number,
    dataPagamento: string
}

export type Conta = {
    id: number,
    nome: string,
    cpf: string,
    dataDeNascimento: string,
    saldo: number,
    extrato: Pagamento[]
}

export let contas: Conta[] = [
    {
        id: 1,
        nome: "Alice",
        cpf: "86043454009",
        dataNascimento: "12/01/1999",
        saldo: 12599,
        extrato: [
            {
                descricao: "conta de água",
                valorPago: 599,
                dataPagamento: "05/07/2022"
            }
        ]
    },
    {
        id: 2,
        nome: "Bob",
        cpf: "96610431086",
        dataNascimento: "25/06/1997",
        saldo: 5000,
        extrato: [
            {
                descricao: "conta de luz",
                valorPago: 249.27,
                dataPagamento: "15/06/2022"
            }
        ]
    }
]
