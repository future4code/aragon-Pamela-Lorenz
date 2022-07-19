import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_PRODUCTS } from "../database/tableNames";

export const getUsers = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const query = req.query.q
        const sort = req.query.sort || "id"
        const order = req.query.order || "asc"
        const limit = Number(req.query.limit) || 10
        const page = Number(req.query.page) || 1
        const offset = limit * (page - 1)

        if (query) {
            const [result] = await connection
                .raw(`SELECT * FROM ${TABLE_PRODUCTS}
                WHERE id LIKE "%${query}%"
                OR email LIKE "%${query}%"
                ORDER BY ${sort} ${order}
                LIMIT ${limit}
                OFFSET ${offset};`)

            return res.status(200).send({ users: result })
        }

        const [result] = await connection
            .raw(`SELECT * FROM ${TABLE_PRODUCTS}
            ORDER BY ${sort} ${order}
            LIMIT ${limit}
            OFFSET ${offset};`)
        res.status(200).send({ users: result })
    } catch (error: any) {
        res.status(errorCode).send({ message: error.message })
    }
};




import { Request, Response } from 'express';
import connection from '../connection';

const addUserToTask = async (req: Request, res: Response) => {
    let errorCode = 400;
    try {
        const { taskId } = req.params;
        // Id do usuário fornecido pelo client, no formato de body.
        const { userId } = req.body;

        const taskById = await connection(table_tasks)
            .select("*")
            .where({ id: taskId });

        // Condicional que verifica se existe uma tarefa com o id fornecido.
        if (!taskById[0]) {
            errorCode = 409;
            throw new Error("Id doesn´t match a valid task.");
        };

        // Busca de usuário pelo seu id.
        const userById = await connection(table_users)
            .select("*")
            .where({ id: userId });

        // Condicional que verifica se existe uma tarefa com o id fornecido.
        if (!userById[0]) {
            errorCode = 409;
            throw new Error("Id doesn´t match a valid user.");
        };

        // Busca de relação usuário-tarefa pelo id do usuário e id da tarefa, simultaneamente.
        const responsibility = await connection(table_responsibles)
            .select("*")
            .where({ userId })
            .andWhere({ taskId })

        // Condicional que verifica se já existe a relação usuário-tarefa registrada.
        if (responsibility[0]) {
            errorCode = 409;
            throw new Error("User has already been added to task.");
        };

        // Conexão que permite inserir uma nova relação usuário-tarefa.
        await connection(table_responsibles)
            .insert({ userId, taskId });
        res.status(201).send({
            message: "User added to task successfully!"
        });
    } catch (err: any) {
        if (error.statusCode === 200) {
            res.status(500).end();
        } else {
            res.status(errorCode).send(error.message);
        };
    };
};
