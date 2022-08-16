import { PostBusiness } from "../../src/business/PostBusiness"
import { PostDatabaseMock } from "../mocks/PostDatabaseMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { HashManagerMock } from "../mocks/services/HashManagerMock"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { IGetPostsInputDTO } from "../../src/models/Post"
import { BaseError } from "../../src/errors/BaseError"

describe("Testando Post Business", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new AuthenticatorMock()
    )

    test("Posts buscados com sucesso.", async () => {
        const input: IGetPostsInputDTO = {
            token: "token-astrodev"
        }
        const response = await postBusiness.getPosts(input)
        expect(response.posts.length).toEqual(3)
        expect(response.posts[0].getId()).toEqual("201")
        expect(response.posts[0].getContent()).toEqual("Oi, sou nova aqui!")
        expect(response.posts[0].getUserId()).toEqual("101")
    })

    test("Falha em buscar posts", async () => {
        expect.assertions(2)
        try {
            await postBusiness.getPosts({ token: "astrodev" } as IGetPostsInputDTO)
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Não autenticado")
                expect(error.statusCode).toEqual(400)
            }
        }
    })
})
