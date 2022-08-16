import { UserBusiness } from "../../src/business/UserBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { ILoginInputDTO } from "../../src/models/User"
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

    test("logado com sucesso.", async () => {
        const input: ILoginInputDTO = {
            email: "astrodev@gmail.com",
            password: "astrodev"
        }
        const response = await userBusiness.login(input)
        expect(response.message).toEqual("Login realizado com sucesso")
        expect(response.token).toEqual("token-astrodev")
    })

    test("deve retornar erro caso a senha seja incorreta", async () => {
        expect.assertions(2)
        try {
            const input: ILoginInputDTO = {
                email: "astrodev@gmail.com",
                password: "pimentinha"
            }
            await userBusiness.login(input)
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(400)
                expect(error.message).toEqual("Invalid password")
            }
        }
    })

    test("deve retornar erro caso o email seja inválido", async () => {
        expect.assertions(2)
        try {
            const input: ILoginInputDTO = {
                email: "astrodev@gmail.co",
                password: "astrodev"
            }
            await userBusiness.login(input)
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(400)
                expect(error.message).toEqual("Invalid email")
            }
        }
    })
})
