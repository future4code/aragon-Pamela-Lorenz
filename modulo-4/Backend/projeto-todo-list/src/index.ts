import express, { Request, Response } from "express";
import cors from "cors";
import { ping } from "./endpoints/ping";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
});

app.get("/ping", ping)

app.get("/users", (req: Request, res: Response) => {
  let errorCode = 400
  try {
    const { search } = req.query
    if (!search) {
      const allUsers = await connection("Users").select("*")
      return res.status(200).send({ message: "sucesso", users: allUsers })
    }
    const searchUsers = await connection("Users").select("*")
      .where("name", "LIKE", `%${search}%`)
      .orWhere("nickname", "LIKE", `%${search}%`)
    res.status(200).send({ message: "sucesso", users: searchUsers })
  } catch (error: any) {
    if (error.statusCode === 200) {
      res.status(500).end()
    }
    else { res.status(errorCode).send(error.message) }
  }
})
