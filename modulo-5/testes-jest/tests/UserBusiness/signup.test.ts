import { UserBusiness } from "../../src/business/UserBusiness"
import { ISignupInputDTO } from "../../src/models/User"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { HashManagerMock } from "../mocks/services/HashManagerMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"

describe("Testando UserBusiness", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new AuthenticatorMock()
    )

    test("Usuário criado com sucesso.", async () => {
        const input: ISignupInputDTO = {
            name: "Pame",
            email: "pamelamaiara1998@gmail.com",
            password: "pame1234"
        }
        const response = await userBusiness.signup(input)
        expect(response.token).toEqual("token-mock")
        expect(response.message).toEqual("Cadastro realizado com sucesso.")
    })
})