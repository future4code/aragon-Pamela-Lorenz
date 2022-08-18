import { BaseDatabase } from "../../src/database/BaseDatabase"
import { IShowDB, Show } from "../../src/models/Show"

export class ShowDatabaseMock extends BaseDatabase {
    public static TABLE_POSTS = "Labook_Posts"
    public static TABLE_LIKES = "Labook_Likes"

    public getShow = async () => {
        const showDB: IShowDB[] = [
            {
                id: "1",
                band: "foo fighters",
                starts_at: new Date("2022/12/05")
            },
            {
                id: "2",
                band: "Pink Floyd",
                starts_at: new Date("2022/12/05")
            },
            {
                id: "3",
                band: "U2",
                starts_at: new Date("2022/12/05")
            }
        ]
        return showDB
    }

    public createShow = async () => { }

    public findShowById = async (id: string) => {
        const showDB: IShowDB[] = await BaseDatabase
            .select()
            .where({ id })
        return showDB[0]
    }

    public updateShow = async (show: Show) => {
        const showDB: IShowDB = {
            id: show.getId(),
            band: show.getBand(),
            starts_at: show.getStartsAt()
        }
        await BaseDatabase
            .connection(ShowDatabase.TABLE_SHOWS)
            .update(showDB)
            .where({ id: showDB.id })
    }

    public deleteShowById = async (id: string) => {
        await BaseDatabase
            .connection(ShowDatabase.TABLE_SHOWS)
            .delete()
            .where({ id })
    }
}
