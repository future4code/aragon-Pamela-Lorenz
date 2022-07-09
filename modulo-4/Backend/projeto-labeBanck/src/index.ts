import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
app.listen(3003, () => { console.log("Servidor rodando na porta 3003") })
app.get("/teste", (req: Request, res: Response) => {
    try {
        res.status(200).send({ mensagem: "testado!" })
    } catch (error) {
        res.status(400).send({ mensagem: error.message })
    }
})

//exerc1

app.post("/contas", (req: Request, res: Response) => {
    let codigoErro = 400
    try {
        const { nome, cpf, dataNascimento } = req.body
        if (!nome || !cpf || !dataNascimento) {
            errorCode = 400
            throw new Error("Parâmetros faltando.");
        }
        if (typeof nome !== "string" || typeof cpf !== "string" || typeof dataNascimento !== "string") {
            errorCode = 422
            throw new Error("Tipo de parâmetro inválido.")
        }
        const indexCpf = contas.findIndex((conta) => { return conta.cpf === cpf })
        if (indexCpf !== -1) {
            errorCode = 409
            throw new Error("Cpf já está cadastrado.")
        }

        const dataDeNascimento = dataDeNascimento.split("/")
        const anoNascimento = dataDeNascimento[dataDeNascimento.length - 1]
        const idade = new Date().getFullYear() - Number(anoNascimento)

        if (idade < 18) {
            errorCode = 400
            throw new Error("Idade deve ser maior ou igual a 18.")
        }
        if (nome.length < 3) {
            errorCode = 400
            throw new Error("Nome deve possuir pelo menos 3 caracteres.")
        }

        const novaConta: Conta = {
            id: Date.now(),
            nome: nome,
            cpf: cpf,
            dataDeNascimento: dataDeNascimento,
            saldo: 0,
            extrato: []
        }
        contas.push(novaConta)
        res.status(201).send({ mensagem: "conta criada com sucesso", contas: contas })
    } catch (error) { res.status(codigoErro).send({ mensagem: error.message }) }
})

//exerc2

app.get("/contas/:id", (req: Request, res: Response) => {
    let codigoErro = 400
    try {
        const id = Number(req.params.id)
        const conta = contas.find((conta) => { return conta.id === id })
        if (!conta) {
            errorCode = 404
            throw new Error("Conta não encontrada.")
        }
        res.status(200).send({ conta: conta, saldo: conta.saldo })
    } catch (error) { res.status(errorCode).send({ mensagem: error.message }) }
})

//exerc3

app.put("/contas/:id", (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const id = Number(req.params.id)
        const saldoAdicional = req.body.saldoAdicional
        if (typeof saldoAdicional !== "number") {
            errorCode = 422
            throw new Error("Tipo inválido de parâmetro.")
        }
        if (saldoAdicional <= 0) {
            errorCode = 400
            throw new Error("Saldo adicional deve ser positivo.")
        }
        const conta = contas.find((conta) => { return conta.id === id })
        if (!conta) {
            errorCode = 404
            throw new Error("Conta não encontrada.")
        }
        conta.saldo += saldoAdicional
        res.status(200).send({
            mensagem: "Saldo adicionado com sucesso",
            conta: conta
        })
    } catch (error) {
        res.status(errorCode).send({ mensagem: error.message })
    }
})

//exerc4

app.put("/contas/:id/pagamento", (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const id = Number(req.params.id)
        const descricao = req.body.descricao
        const valor = req.body.valor
        if (!valor || !descricao) {
            errorCode = 400
            throw new Error("Parâmetros faltando.")
        }
        if (typeof valor !== "number" || typeof descricao !== "string") {
            errorCode = 422
            throw new Error("Tipo de parâmetro inválido.")
        }
        if (valor <= 0) {
            errorCode = 400
            throw new Error("Valor do pagamento deve ser maior que 0.")
        }
        if (descricao.length < 6) {
            errorCode = 400
            throw new Error("Descrição deve conter pelo menos 6 caracteres.")
        }
        const conta = contas.find((conta) => { return conta.id === id })
        if (!conta) {
            errorCode = 404
            throw new Error("Conta não encontrada.")
        }
        if (conta.saldo < valor) {
            errorCode = 400
            throw new Error("Saldo insuficiente.")
        }
        conta.saldo -= valor
        const dataAtual = new Date().toLocaleString().split(" ")[0]
        const novoRecibo: Pagamento = {
            descricao: descricao,
            valor: valor,
            dataPagamento: dataAtual
        }
        conta.extrato.push(novoRecibo)
        res.status(200).send({ mensagem: "Pagamento realizado com sucesso", conta: conta })
    } catch (error) {
        res.status(errorCode).send({ mensagem: error.message })
    }
})
