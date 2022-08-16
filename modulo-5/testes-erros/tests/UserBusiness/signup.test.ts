import { UserBusiness } from "../../src/business/UserBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { ISignupInputDTO } from "../../src/models/User"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { HashManagerMock } from "../mocks/services/HashManagerMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"

describe("Testando User Business", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new AuthenticatorMock()
    )

    test("Usuário criado com sucesso", async () => {
        const input: ISignupInputDTO = {
            name: "astrodev",
            email: "astrodev@gmail.com",
            password: "astrodev"
        }
        const response = await userBusiness.signup(input)
        expect(response.message).toEqual("Cadastro realizado com sucesso")
        expect(response.token).toEqual("token-mock")
    })

    test("deve retornar erro caso o nome seja uma string vazia", async () => {
        expect.assertions(2)
        try {
            const input: ISignupInputDTO = {
                name: "",
                email: "astrodev@gmail.com",
                password: "astrodev"
            }
            await userBusiness.signup(input)
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(400)
                expect(error.message).toEqual("Invalid name")
            }
        }
    })

    test("deve retornar erro caso o nome não seja uma string", async () => {
        expect.assertions(2)
        try {
            const input = {
                name: undefined,
                email: "astrodev@gmail.com",
                password: "astrodev"
            } as unknown as ISignupInputDTO
            await userBusiness.signup(input)
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(400)
                expect(error.message).toEqual("Invalid name")
            }
        }
    })
})
