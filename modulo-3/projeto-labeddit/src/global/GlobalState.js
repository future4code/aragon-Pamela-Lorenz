import { createContext, useState } from "react"
import useRequisicoesData from "../hooks/useRequisicoes"

export const GlobalContext = createContext()

export default function GlobalState(props) {

    const [FeedPage, setFeedPage] = useState([])

    const context = {
    }

    return (
        <GlobalContext.Provider value={context}>
            {props.children}
        </GlobalContext.Provider>
    )
}