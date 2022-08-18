import { ShowDatabase } from "../database/ShowDatabase"
import { ICreateShowInputDTO, ICreateShowOutputDTO, IDeleteInputDTO, IDeleteOutputDTO, IGetShowInputDTO, IGetShowOutputDTO, Show } from "../models/Show"
import { USER_ROLES } from "../models/User"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"

export class ShowBusiness {
    constructor(
        private showDatabase: ShowDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) { }

    public createShow = async (input: ICreateShowInputDTO) => {
        const { token, band, startsAt } = input
        const payload = this.authenticator.getTokenPayload(token)
        
        if(payload){

        }

        const id = this.idGenerator.generate()
        const show = new Show(
            id,
            band,
            new Date(startsAt)
        )
        await this.showDatabase.createShow(show)
        const response: ICreateShowOutputDTO = { message: "Show criado com sucesso.", show }
        return response
    }

    public getShow = async (input: IGetShowInputDTO) => {
        const { token } = input
        const payload = this.authenticator.getTokenPayload(token)
        const { search, sort, limit, page } = input
        const offset = limit * (page - 1)
        const showsDB = await this.showDatabase.getShow(search, sort, limit, offset)

        const shows = showsDB.map(showDB => {
            return new Show(
                showDB.id,
                showDB.band,
                showDB.starts_at
            )
        })

        for (let show of shows) {
            const showId = show.getId()
        }
        const response: IGetShowOutputDTO = {
            shows
        }
        return response
    }

    public deleteShow = async (input: IDeleteInputDTO) => {
        const { token, id } = input
        const payload = this.authenticator.getTokenPayload(token)
        if (!payload) {
            throw new Error("Não autenticado")
        }
        const showDB = await this.showDatabase.findShowById(id)
        if (!showDB) {
            throw new Error("Show não encontrado")
        }
        if (payload.role === USER_ROLES.NORMAL) {
            if (showDB.id !== payload.id) {
                throw new Error("Sem autorização")
            }
        }
        await this.showDatabase.deleteShowById(id)
        const response: IDeleteOutputDTO = {
            message: "Show deletado com sucesso"
        }

        return response
    }
}
