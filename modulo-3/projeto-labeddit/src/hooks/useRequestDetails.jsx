import axios from "axios";
import { URL } from "../constantes/links";
import { useState } from "react";

export const useRequisicoesDetalhes = (initalState) => {
    const [detalhe, setDetalhe] = useState(initalState)
    const buscarDetalhe = (name) => {
    axios.get(`${URL}/${name}`)
    .then((res) => {
        setDetalhe(res.data)
    })
    .catch((err) => {
        console.log(err.message)
    })}

    return[detalhe, buscarDetalhe]
}
