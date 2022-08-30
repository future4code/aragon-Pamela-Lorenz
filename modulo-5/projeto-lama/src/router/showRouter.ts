import { Router } from 'express'
import { userInfo } from 'os'
import { ShowBusiness } from '../business/ShowBusiness'
import { ShowController } from '../controller/ShowController'
import { ShowDatabase } from '../database/ShowDatabase'
import { Authenticator } from '../services/Authenticator'
import { HashManager } from '../services/HashManager'
import { IdGenerator } from '../services/IdGenerator'

export const showRouter = Router()

const showController = new ShowController(
    new ShowBusiness(
        new ShowDatabase(),
        new IdGenerator(),
        new HashManager(),
        new Authenticator()
    )
)

showRouter.get("/", showController.getShow)
showRouter.post("/", showController.createShow)
showRouter.post("/:id/ticket", showController.buyTicket)
showRouter.delete("/:id/ticket", showController.deleteTicket)
showRouter.delete("/:id", showController.deleteShow)
