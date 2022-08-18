import { IShowDB, Show } from "../models/Show"
import { BaseDatabase } from "./BaseDatabase"

export class ShowDatabase extends BaseDatabase {
    public static TABLE_SHOWS = "Lama_Shows"
    public static TABLE_TICKETS = "Lama_Tickets"

    public getShow = async (
        search: string,
    sort: string,
    limit: number,
    offset: number
    ) => {
    const showDB: IShowDB[] = await BaseDatabase
        .connection(ShowDatabase.TABLE_SHOWS)
        .select()
        .where(`band`, "LIKE", `%${search}%`)
        .orderBy(`starts_at`, sort)
        .limit(limit)
        .offset(offset)
    return showDB
}

    public createShow = async (show: Show) => {
    const showDB: IShowDB = {
        id: show.getId(),
        band: show.getBand(),
        starts_at: show.getStartsAt()
    }
    await BaseDatabase
        .connection(ShowDatabase.TABLE_SHOWS)
        .insert(showDB)
}

    public findShowById = async (id: string) => {
    const showDB: IShowDB[] = await BaseDatabase
        .connection(ShowDatabase.TABLE_SHOWS)
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
