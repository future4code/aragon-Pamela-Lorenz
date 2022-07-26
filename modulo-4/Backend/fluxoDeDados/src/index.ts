import express, { Request, Response } from "express"
import cors from "cors"
import axios from "axios"
import { products, Products } from "./data"
import { stringify } from "querystring"

const app = express()
app.use(express.json())
app.use(cors())
app.listen(3030, () => console.log("servidor on."))
app.get("/test", (req: Request, res: Response) => {
    res.status(200).send({
        message: "servidor rodando porta 3030"
    })
})

//exerc2,3

app.get("https://localhost:3030/produtos", (req: Request, res: Response) => {
    try {
        res.status(200).send(products)
    } catch (error: any) {
        res.status(500).send(error.message)
    }
})


// exerc4

app.post("https://localhost3030/products", (req: Request, res: Response) => {

    try {
        const { name, price } = req.body
        let newProducts: Products = {
            id: (products.length + 1).toString(),
            name: name,
            price: price
        }
        products.push(newProducts)
        res.send({
            mensagem: "Produto criado com sucesso",
            products: products
        })
    } catch (error: any) {
        res.status(500).send(error.message)
    }
})

//exerc5

app.put("https://localhost:3030/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const { price } = req.body
        if (typeof price !== "number") {
            res.statusCode = 422
            throw new Error("error: price diferente de number.")
        }
        if (price <= 0) {
            res.statusCode = 422
            throw new Error("error: price tem que ser maior ou igual a 0.")
        }
        const index = products.findIndex((product) => {
            return id === id
        })
        if (index === -1) {
            res.statusCode = 422
            throw new Error("error: id não encontrado")
        }
        const newPrice = products.map((product) => {
            if (product.id === id) {
                product.price = price
            }
            return product
        }
        ).filter((product) => {
            return product.id === id
        })
        res.status(201).send({
            message: "Preço alterado",
            product: newPrice
        })
    } catch (error) {
        res.send({
            message: error.message
        })
    }
})

//exerc6

app.delete("https://localhost:3030/products/:id", (req: Request, res: Response) => {
    try {
        const id = (products.length - 1).toString()
        const index = products.findIndex((product) => {
            return id === id
        })
        if (index === -1) {
            return res.send({
                mensagem: "Produto não encontrado",
                id: id
            })
        }
        products.splice(index, 1)
        res.send({
            mensagem: "Produto deletado com sucesso",
            products: products
        })
    }
    catch (error: any) {
        res.status(500).send(error.message)
    }
})
