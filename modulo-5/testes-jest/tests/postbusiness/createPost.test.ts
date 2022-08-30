import { PostBusiness } from "../../src/business/PostBusiness"
import { ICreatePostInputDTO } from "../../src/models/Post"
import { PostDatabaseMock } from "../mocks/PostDatabaseMock"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { HashManagerMock } from "../mocks/services/HashManagerMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"

describe("testando post business.", () => {
    const postBusiness = new PostBusiness(new PostDatabaseMock(), new IdGeneratorMock(), new HashManagerMock(), new AuthenticatorMock())
    test("Post Criado com sucesso", async () => {
        const input: ICreatePostInputDTO = {
            token: "token-astrodev",
            content: "Mock da trabalho."
        }
        const response = await postBusiness.createPost(input)
        expect(response.message).toEqual("Post criado com sucesso.")
        expect(response.post).toEqual("token-astrodev")
    })
})
