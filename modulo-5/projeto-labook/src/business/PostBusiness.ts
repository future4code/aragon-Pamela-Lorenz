import { UserDatabase } from "../database/UserDatabase"
import { IGetPostsInputDTO } from "../models/Post"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"

export class PostBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) { }

    public getPosts = async (input: IGetPostsInputDTO) => {
        const token = input.token
        const search = input.search || ""
        const sort = input.sort || "ASC"
        const limit = Number(input.limit) || 10
        const page = Number(input.page) || 1
        const offset = limit * (page - 1)
        if (!token) {
            throw new Error("Token faltando")
        }
        const payload = this.authenticator.getTokenPayload(token)
        if (!payload) {
            throw new Error("Token inválido")
        }

        const postsDB = await this.postDatabase.getPosts(
            search,
            sort,
            limit,
            offset
        )
        const posts = postsDB.map((postDB) => {
            return new Posts(
                postDB.id,
                postDB.title,
                postDB.description,
                postDB.created_at,
                postDB.updated_at,
                postDB.creator_id
            )
        })
        const response = {
            posts
        }
        return response
    }

    public createPost = async (input: ICreatePostInputDTO) => {
        const title = input.title
        const description = input.description
        const token = input.token
        const authenticator = new Authenticator()
        const payload = authenticator.getTokenPayload(token)
        if (!payload) {
            throw new Error("Token faltando ou inválido")
        }
        if (!title) {
            throw new Error("Parâmetro 'title' faltando")
        }
        if (typeof title !== "string") {
            throw new Error("Parâmetro 'title' deve ser uma string")
        }
        if (title.length < 3) {
            throw new Error("Parâmetro 'title' deve possuir pelo menos 3 caracteres")
        }
        if (!description) {
            throw new Error("Parâmetro 'description' faltando")
        }
        if (typeof description !== "string") {
            throw new Error("Parâmetro 'description' deve ser uma string")
        }
        if (description.length < 10) {
            throw new Error("Parâmetro 'description' deve possuir pelo menos 10 caracteres")
        }
        const idGenerator = new IdGenerator()
        const post = new Post(
            idGenerator.generate(),
            title,
            description,
            new Date(),
            new Date(),
            payload.id
        )
        await this.PostDatabase.createPost(post)
        const response = {
            message: "Post criado com sucesso",
            post
        }
        return response
    }

    public editPost = async (input: IEditPostInputDTO) => {
        const postId = input.id
        const title = input.title
        const description = input.description
        const token = input.token
        const authenticator = new Authenticator()
        const payload = authenticator.getTokenPayload(token)
        if (!payload) {
            throw new Error("Token faltando ou inválido")
        }
        if (!title && !description) {
            throw new Error("Parâmetro faltando")
        }
        if (title && typeof title !== "string") {
            throw new Error("Parâmetro 'title' deve ser uma string")
        }
        if (title && title.length < 3) {
            throw new Error("Parâmetro 'title' deve possuir pelo menos 3 caracteres")
        }
        if (description && typeof description !== "string") {
            throw new Error("Parâmetro 'description' deve ser uma string")
        }
        if (description && description.length < 10) {
            throw new Error("Parâmetro 'description' deve possuir pelo menos 10 caracteres")
        }
        const postDB = await thisPostDatabase.findPostById(postId)
        if (!postDB) {
            throw new Error("O post a ser editado, não existe")
        }
        const post = new Post(
            postDB.id,
            postDB.title,
            postDB.description,
            postDB.created_at,
            postDB.updated_at,
            postDB.creator_id
        )
        if (payload.role === USER_ROLES.NORMAL) {
            if (payload.id !== post.getCreatorId()) {
                throw new Error("Esse post não pode ser editado por esse usuário")
            }
        }
        title && post.setTitle(title)
        description && post.setDescription(description)
        await postDatabase.updatePost(post)
        const response = {
            message: "Post editado com sucesso",
            post
        }
        return response
    }

    public deletePost = async (input: IDeletePostInputDTO) => {
        const token = input.token
        const postId = input.postId
        const authenticator = new Authenticator()
        const payload = authenticator.getTokenPayload(token)
        if (!payload) {
            throw new Error("Token faltando ou inválido")
        }

        const postDB = await this.postDatabase.findPostById(postId)
        if (!postDB) {
            throw new Error("O post a ser deletado não existe")
        }
        const post = new Post(
            postDB.id,
            postDB.title,
            postDB.description,
            postDB.created_at,
            postDB.updated_at,
            postDB.creator_id
        )
        if (payload.role === USER_ROLES.NORMAL) {
            if (payload.id !== post.getCreatorId()) {
                throw new Error("Esse post não pode ser deletado por esse usuário")
            }
        }
        await this.postDatabase.deletePostById(post.getId())
        const response = {
            message: "Post deletado com sucesso"
        }
        return response
    }
}
