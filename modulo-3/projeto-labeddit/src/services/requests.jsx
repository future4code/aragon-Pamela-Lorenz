import axios from "axios"
import { BASE_URL } from "../constants/urls"
import { goToFeedPage } from "../routes/coordinator"

export const requestLogin = (form, navigate, clear) => {
    const body = { email: form.email, password: form.password }
    axios.post(`${BASE_URL}/users/login`, body)
        .then(response => {
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("userEmail", form.email)
            alert("Logado com sucesso!")
            goToFeedPage(navigate)
        })
        .catch(error => {
            alert("Erro ao se logar!")
            clear()
        })
}

export const requestSignUp = (form, navegate, clear) => {
    const body = { username: form.name, email: form.email, password: form.password }
    axios.post(`${BASE_URL}/users/signup`, body)
        .then(response => {
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("userEmail", form.email)
            alert("Usuário criado com sucesso!")
            goToFeedPage(navegate)
        })
        .catch(error => {
            alert("Erro ao criar usuário!")
            clear()
        })
}

export const requestCreatePost = (form, navigate, clear) => {
    const header = { headers: { authorization: localStorage.getItem("token") } }
    const body = { title: form.title, body: form.body }
    axios.post(`${BASE_URL}/posts`, body, header)
        .then(response => {
            alert(response.data)
            // getPosts()
            clear()
        })
        .catch(error => console.log(error.menssage))
}
