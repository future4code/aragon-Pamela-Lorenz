import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { goToSignUpPage } from "../../routes/cordinator";
import axios from "axios"
import { goToHomePage } from "../../routes/cordinator";
import { BASE_URL } from "../../constants/urls"

  export default function LoginPage() {
  const navigate = useNavigate();

  const [login, setLogin] = useState({ email: "", password: "" });
  const token = localStorage.getItem("token");
  const headers = {
    headers: {
      auth: token,
    },
  };

  const postLogin = (navigate) => {
    axios.post(`${BASE_URL}/login`, login)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        goToHomePage(navigate);
      })
      .catch((err) => {
        alert("Usuário ou senha inválidos");
        console.log(err.response.data.message);
      });
  };

  const onChangeLogin = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const signIn = (e) => {
    e.preventDefault();
    postLogin(navigate);
  };

  return (

    <main>

      <p>
        <b>Entrar</b>
      </p>

      <form onSubmit={signIn}>
        <label htmlFor={"name"}> Nome: </label>
        <input
          required
          id="email"
          label="email"
          name="email"
          autoComplete="email"
          placeholder="email@email.com"
          value={login.email}
          onChange={onChangeLogin}
        />

        <label htmlFor={"senha"}> Senha: </label>
        <input
          required
          name="password"
          type="password"
          label="password"
          id="senha"
          placeholder="mínimo 6 caracteres"
          autoComplete="digite seu email"
          value={login.password}
          onChange={onChangeLogin}
        />
        <button type="submit">
          <b>Entrar</b>
        </button>

        <button onClick={() => goToSignUpPage(navigate)}>
          Não possui cadastro? Clique aqui.
        </button>

      </form>
    </main >
  )
}
