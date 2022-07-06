import express, { Request, Response } from "express";
import cors from "cors";
import { afazeres } from "./exercicio2";

const app = express()

app.use(cors())

app.use(express.json())

app.listen(3003, () => {

    console.log("Servidor rodando porta 3003")
})

app.get("/ping", (req: Request, res: Response) => {
    res.send({
        mensagem: "Pong!"
    })
})

app.get("/afazeres/:userId", (req: Request, res: Response) => {
    const userId = req.params.userId
    const resultado = afazeres.filter((afazer) => {
        return afazer.userId === userId
    })
    res.send({ afazeres: resultado })
})
