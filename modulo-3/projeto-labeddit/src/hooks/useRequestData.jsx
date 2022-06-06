import axios from "axios"
import { URL } from "../constantes/links"
import { useState, useEffect } from "react"

const useRequestData = (path, initalState) => {
    const [data, setData] = useState(initalState)
    const buscarLista = () => {
        axios.get(`${URL}/${path}`)
            .then(res => setData(res.data))
            .catch(error => console.log(error))
    }
    useEffect(() => { buscarLista() }, [path])
    return [data, buscarLista]
}
export default useRequestData